import React, { useState, useRef, useEffect, useCallback } from 'react';

interface CellProps {
    digit: number;
    onChange: (newValue: number) => boolean;
}

export default function Cell({ digit, onChange }: CellProps) {
    const [value, setValue] = useState<string>(digit === 0 ? '' : digit.toString());
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isLocked, setIsLocked] = useState<boolean>(digit !== 0);
    const [showError, setShowError] = useState<boolean>(false);
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setValue(digit === 0 ? '' : digit.toString());
    }, [digit]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (isLocked || value !== '') return;

        if (e.key >= '1' && e.key <= '9') {
            if (onChange(Number(e.key))) {
                setValue(e.key);
                setIsLocked(true);
            } else {
                setShowError(true);
                setTimeout(() => setShowError(false), 1000);
            }
        }
    };

    const handleFocus = useCallback(() => {
        if (!isLocked && inputRef.current) {
            inputRef.current.focus();
            setIsFocused(true);
        }
    }, [isLocked]);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    return (
        <div
            tabIndex={0}
            role="button"
            aria-disabled={isLocked}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={inputRef}
            className={`flex items-center justify-center h-full w-full outline-none
                ${isLocked ? 'bg-blue cursor-default' : isFocused ? 'bg-gray' : ''}`}
        >
            {showError ? (
                <span className="text-loss text-3xl font-mono">X</span>
            ) : (
                <span className="text-center text-3xl font-mono select-none">{value}</span>
            )}
        </div>
    );
}
