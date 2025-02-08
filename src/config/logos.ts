import anthropicLogo from '@/assets/anthropic.png';
import cloudflareLogo from '@/assets/cloudflare.png';
import googleLogo from '@/assets/google.png';
import openaiLogo from '@/assets/openai.ico';
import groqLogo from '@/assets/groq.png';
import metaLogo from '@/assets/meta.svg';
import xAILogo from '@/assets/xAI.svg';
import deepseekLogo from '@/assets/deepseek.svg';
import openrouterLogo from '@/assets/openrouter.png';
import nvidiaLogo from '@/assets/nvidia.ico';
import cohereLogo from '@/assets/Cohere.png';
import mistralLogo from '@/assets/mistral.png';
import qwenLogo from '@/assets/qwen.png';
import alibabaLogo from '@/assets/alibaba.png';

// Create a mapping of provider names to their logos
export const providerLogos: Record<string, string> = {
    'Anthropic': anthropicLogo,
    'Cloudflare': cloudflareLogo,
    'Google AI': googleLogo,
    'OpenAI': openaiLogo,
    "Groq": groqLogo,
    'xAI': xAILogo,
    'Meta': metaLogo,
    'DeepSeek': deepseekLogo,
    'OpenRouter': openrouterLogo,
    'Mistral': mistralLogo,
    'Cohere': cohereLogo,
    'Alibaba': alibabaLogo,
};

// Add developer logos mapping (using same logos as providers)
export const developerLogos: Record<string, string> = {
    'Anthropic': anthropicLogo,
    'OpenAI': openaiLogo,
    'Google AI': googleLogo,
    'Meta': metaLogo,
    'xAI': xAILogo,
    'DeepSeek': deepseekLogo,
    'Nvidia': nvidiaLogo,
    'Mistral': mistralLogo,
    'Cohere': cohereLogo,
    'Qwen': qwenLogo,
};