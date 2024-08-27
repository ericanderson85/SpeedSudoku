"use server"

interface MiniPuzzleCellProps {
    digit: number;
}

export default async function MiniPuzzleCell({ digit }: MiniPuzzleCellProps) {
    return (
        <div
            className={`flex items-center justify-center h-full w-full outline-none ${digit !== 0 && "bg-blue"}`}>
            <span className="text-center text-[4px] font-mono select-none">{digit === 0 ? "" : digit}</span>
        </div>
    );
}
