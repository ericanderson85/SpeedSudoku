"use server"

import { IPuzzle } from "@/models/Puzzle";
import MiniPuzzle from "./MiniPuzzle/MiniPuzzle";

interface PuzzleCardProps {
    puzzle: IPuzzle;
    completionTimeSeconds: number;
    score: number;
    timestamp: Date;
}

export default async function PuzzleCard({ puzzle, completionTimeSeconds, score, timestamp }: PuzzleCardProps) {
    const won = score > 0;
    const date = timestamp.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="flex w-1/2 p-2 rounded-lg border-black border justify-between items-center">
            <MiniPuzzle puzzle={puzzle.board} />
            <span>{puzzle.elo}</span>
            <span className={`${won ? "text-win" : "text-loss"}`}>{won && "+"}{score}</span>
            <span>{completionTimeSeconds} seconds</span>
            <span>{date}</span>

        </div>
    );
}