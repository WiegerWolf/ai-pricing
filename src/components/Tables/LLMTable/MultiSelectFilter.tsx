import { Column } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";
import { useState, useRef, useEffect } from "react";
import { providerLogos } from "@/config/logos";
import { Checkbox } from "@/components/ui/checkbox";
import { createPortal } from "react-dom";

interface MultiSelectFilterProps {
    column: Column<LLMModel, unknown>;
    options: string[];
    placeholder?: string;
}

export function MultiSelectFilter({ column, options, placeholder }: MultiSelectFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const filterValue = column.getFilterValue() as string[] || [];
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    
    // Calculate dropdown position when open
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            // Use viewport-relative coordinates directly for fixed positioning
            setPosition({
                top: rect.bottom, // Position below the button relative to viewport
                left: rect.left,  // Position horizontally aligned with the button relative to viewport
                width: rect.width
            });
        }
    }, [isOpen]);
    
    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen && 
                dropdownRef.current && 
                buttonRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Toggle a provider in the filter
    const toggleProvider = (provider: string) => {
        const currentFilterValue = [...(filterValue || [])];
        const index = currentFilterValue.indexOf(provider);
        
        if (index >= 0) {
            currentFilterValue.splice(index, 1);
        } else {
            currentFilterValue.push(provider);
        }
        
        column.setFilterValue(currentFilterValue.length ? currentFilterValue : undefined);
    };

    // Clear all selections
    const clearSelections = () => {
        column.setFilterValue(undefined);
    };

    const dropdownMenu = isOpen ? (
        createPortal(
            <div 
                ref={dropdownRef}
                className="fixed z-50 bg-white border rounded shadow-lg max-h-60 overflow-auto"
                style={{ 
                    top: `${position.top}px`, 
                    left: `${position.left}px`, 
                    width: `${Math.max(position.width, 192)}px` 
                }}
            >
                <div className="sticky top-0 bg-white border-b p-1 flex justify-between items-center">
                    <span className="text-xs font-medium">Select providers</span>
                    <button 
                        onClick={clearSelections}
                        className="text-xs text-blue-500 hover:text-blue-700"
                    >
                        Clear
                    </button>
                </div>
                <div className="p-1">
                    {options.map(option => (
                        <div 
                            key={option}
                            className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded cursor-pointer"
                            onClick={() => toggleProvider(option)}
                        >
                            <Checkbox 
                                checked={filterValue?.includes(option)}
                                className="h-3 w-3"
                            />
                            {providerLogos[option] && (
                                <img
                                    src={providerLogos[option]}
                                    alt={`${option} logo`}
                                    className="w-3.5 h-3.5 object-contain flex-shrink-0"
                                />
                            )}
                            <span className="text-xs truncate">{option}</span>
                        </div>
                    ))}
                </div>
            </div>,
            document.body
        )
    ) : null;

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full h-6 text-xs min-w-[30px] py-0 pl-2 pr-6 border rounded"
            >
                <span className="truncate">
                    {filterValue && filterValue.length
                        ? `${filterValue.length} selected`
                        : placeholder || "All"}
                </span>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </button>
            {dropdownMenu}
        </div>
    );
}
