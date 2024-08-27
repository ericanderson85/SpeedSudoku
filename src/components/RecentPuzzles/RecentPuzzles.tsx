"use server"

import Puzzle from "@/models/Puzzle";
import { PreviousPuzzle } from "@/models/User"
import PuzzleCard from "./PuzzleCard/PuzzleCard";
import Link from "next/link";

interface PuzzleCardsProps {
    puzzleHistory: PreviousPuzzle[] | undefined
}

export default async function RecentPuzzles({ puzzleHistory }: PuzzleCardsProps) {
    if (!puzzleHistory || puzzleHistory.length == 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-1 w-full">
                <span className="text-2xl font-medium">Recent Puzzles</span>
                <div className="flex w-1/2 p-2 h-[4.5rem] rounded-lg border-black border justify-between items-center">
                    <span className="text-center w-full">No recent puzzles</span>
                </div>
            </div>
        );
    }

    const puzzleHistoryCards = [];
    for (let i = 0; i < puzzleHistory.length && i < 10; i++) {
        const { puzzleId, completionTimeSeconds, score, timestamp } = puzzleHistory[i];
        const puzzle = await Puzzle.findById(puzzleId).exec();

        puzzleHistoryCards.push(
            <PuzzleCard key={puzzle._id} puzzle={puzzle.toObject()} completionTimeSeconds={completionTimeSeconds} score={score} timestamp={timestamp} />
        )
    }

    return (
        <div className="flex flex-col items-center justify-center gap-1 w-full">
            <span className="text-2xl font-medium">Recent Puzzles</span>
            {puzzleHistoryCards}
        </div>
    )
}