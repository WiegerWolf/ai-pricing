// hooks/useContainerWidth.ts
import { useEffect, useRef, useState } from 'react';

export function useContainerWidth() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width);
        });

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    return { containerRef, width };
}