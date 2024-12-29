#!/usr/bin/env python3

import os
import subprocess
import json
import http.client
from urllib.parse import urlparse

# Default values
DEFAULT_GIT_EMAIL = "you@example.com"
DEFAULT_GIT_NAME = "Your Name"

# Environment variables
AI_PROVIDER = os.getenv("AI_PROVIDER", "groq")  # Default to "groq" if not set

# Groq AI Provider settings
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "sk-6knU2kzDd2WxEaIe42825bA9D11240AeAd871aDc9cF14cF8")
GROQ_API_URL = os.getenv("GROQ_API_URL", "http://192.168.68.160:3000/v1/chat/completions")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

# fn to get the default gateway IP (for use in determining the Ollama API URL)
def get_default_gateway_ip():
    command = "/sbin/ip route|awk '/default/ { print $3 }'"
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout.strip()

# Ollama AI Provider settings
OLLAMA_API_URL = f"http://{get_default_gateway_ip()}:11434/v1/chat/completions"
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "codestral:22b-v0.1-q4_0")

# Determine which API URL and model to use
if AI_PROVIDER == "groq":
    API_URL = GROQ_API_URL
    API_KEY = GROQ_API_KEY
    MODEL = GROQ_MODEL
    USE_HTTPS = False # No HTTPS needed for local network instance
else:
    API_URL = OLLAMA_API_URL
    API_KEY = None  # No API key needed for Ollama in the given example
    MODEL = OLLAMA_MODEL
    USE_HTTPS = False

def get_diff(cached=True):
    command = ["git", "diff"]
    if cached:
        command.append("--cached")
    result = subprocess.run(command, capture_output=True, text=True)
    return result.stdout.strip()

def commit(message, unstaged=False):
    command = ["git", "commit"]
    if unstaged:
        command.append("--all")
    command.extend(["-m", message])
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error committing changes: {result.stderr}")
        exit(1)

def prompt(diff):
    return (
        "Write a commit message for these changes (output just the commit message itself without any markup or quotes):\n\n"
        + diff
    )

def call_api(message):
    data = {
        "messages": [{"role": "user", "content": message}],
        "model": MODEL,
    }
    headers = {
        "Content-Type": "application/json",
    }
    if API_KEY:
        headers["Authorization"] = f"Bearer {API_KEY}"
    
    url = urlparse(API_URL)
    conn = http.client.HTTPSConnection(url.netloc) if USE_HTTPS else http.client.HTTPConnection(url.netloc)
    conn.request("POST", url.path, body=json.dumps(data), headers=headers)
    response = conn.getresponse()
    if response.status != 200:
        print(f"Error calling API: {response.read().decode()}")
        exit(1)

    response_data = json.loads(response.read().decode())
    return response_data["choices"][0]["message"]["content"].strip()

def check_and_set_git_credentials():
    email_result = subprocess.run(["git", "config", "user.email"], capture_output=True, text=True)
    name_result = subprocess.run(["git", "config", "user.name"], capture_output=True, text=True)
    
    if not email_result.stdout.strip():
        subprocess.run(["git", "config", "--global", "user.email", DEFAULT_GIT_EMAIL])
        
    if not name_result.stdout.strip():
        subprocess.run(["git", "config", "--global", "user.name", DEFAULT_GIT_NAME])

def add_new_files():
    result = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True)
    lines = result.stdout.strip().split("\n")
    new_files = [line[3:] for line in lines if line.startswith("?? ")]
    if new_files:
        subprocess.run(["git", "add"] + new_files)

def main():
    check_and_set_git_credentials()

    # Step 1: Check if there are staged changes
    diff_staged = get_diff(cached=True)
    if diff_staged:
        commit_message = call_api(prompt(diff_staged))
        print(commit_message)
        if not commit_message:
            print("Failed to generate commit message")
            exit(1)
        commit(commit_message, unstaged=False)
        exit(0)
    
    # Step 2: Check if there are unstaged changes
    diff_unstaged = get_diff(cached=False)
    if diff_unstaged:
        commit_message = call_api(prompt(diff_unstaged))
        print(commit_message)
        if not commit_message:
            print("Failed to generate commit message")
            exit(1)
        commit(commit_message, unstaged=True)
        exit(0)
    
    # Step 3: Check for new files, stage them, and commit if found
    add_new_files()
    diff_new_files = get_diff(cached=True)
    if diff_new_files:
        commit_message = call_api(prompt(diff_new_files))
        print(commit_message)
        if not commit_message:
            print("Failed to generate commit message")
            exit(1)
        commit(commit_message, unstaged=False)
        exit(0)

    # No changes to commit
    print("No changes to commit")
    exit(0)

if __name__ == "__main__":
    main()
