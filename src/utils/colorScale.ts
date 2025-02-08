export function getColumnMinMax(data: any[], accessor: string) {
    const values = data
        .map(item => item[accessor])
        .filter(val => val !== null && val !== undefined);
    return {
        min: Math.min(...values),
        max: Math.max(...values)
    };
}

export function getRelativeValue(value: number, min: number, max: number, useLog = false): number {
    if (min === max) return 0;
    
    if (useLog) {
        // Handle special cases where values might be 0 or negative
        const safeMin = min <= 0 ? 0.01 : min;
        const safeValue = value <= 0 ? 0.01 : value;
        const safeMax = max <= 0 ? 0.01 : max;
        
        // Use log10 for more intuitive scaling
        const logValue = Math.log10(safeValue);
        const logMin = Math.log10(safeMin);
        const logMax = Math.log10(safeMax);
        
        return (logValue - logMin) / (logMax - logMin);
    }

    return (value - min) / (max - min);
}

// Returns a background style for numerical cells
export function getCellBackground(
    value: number | null | undefined,
    min: number,
    max: number,
    options: {
        useLog?: boolean;
        color?: string;
    } = {}
) {
    if (value === null || value === undefined) return {};
    
    const { useLog = false, color = 'rgb(243 232 255)' } = options;
    const relative = getRelativeValue(value, min, max, useLog);
    
    return {
        background: `linear-gradient(to right, ${color} ${relative * 100}%, transparent ${relative * 100}%)`,
        borderRadius: '0.25rem'
    };
}
