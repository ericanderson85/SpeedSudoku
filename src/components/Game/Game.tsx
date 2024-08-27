"use client"

import { useEffect, useRef, useState } from "react";
import SudokuPuzzle from "../SudokuPuzzle/SudokuPuzzle";
import { IUser } from "@/models/User";
import { getEloInfo } from "@/lib/elo";
import Cell from "../SudokuPuzzle/Cell/Cell";
import findPuzzle, { PuzzleData } from "@/lib/findPuzzle";
import GameInfo from "./GameInfo/GameInfo";
import WinLossScreen from "./WinLossScreen/WinLossScreen";


interface GameProps {
    user: IUser | null,
};

interface SudokuPuzzle {
    elo: number,
    board: number[][],
    solution: number[][]
};

const TIME_TO_COMPLETE_PUZZLE_SECONDS = 300;


export default function Game({ user }: GameProps) {
    const [puzzleData, setPuzzleData] = useState<PuzzleData | null>(null);
    const [isWin, setIsWin] = useState<boolean>(false);
    const [isLoss, setIsLoss] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Get puzzle
    useEffect(() => {
        if (!user) return;

        async function getPuzzle(user: IUser) {
            const data = await findPuzzle(user);
            setPuzzleData(data);
        }

        getPuzzle(user);
    }, []);

    // Timer
    useEffect(() => {
        if (!puzzleData || !puzzleData?.time) return;

        if (!isLoss && !isWin) {
            intervalRef.current = setInterval(() => {
                setPuzzleData((prev) => {
                    if (!prev) return null;

                    const newTime = prev.time - 1;

                    if (newTime <= 0) {
                        setIsLoss(true);
                    }

                    return {
                        ...prev,
                        time: newTime,
                    };
                })
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [puzzleData?.time]);

    // Handle win and loss
    useEffect(() => {
        if (!puzzleData || !user) return;

        async function handleResult(user: IUser, puzzleData: PuzzleData, won: boolean) {
            try {
                if (!user) {
                    return;
                }

                const eloInfo = getEloInfo(user.elo, puzzleData.elo);

                const newElo = won ? eloInfo.win : eloInfo.loss;
                const score = newElo - user.elo;

                const thisPuzzleData = {
                    puzzleId: puzzleData.puzzleId,
                    completionTimeSeconds: TIME_TO_COMPLETE_PUZZLE_SECONDS - puzzleData.time,
                    score: score,
                    timestamp: new Date()
                };

                const puzzleHistory = [...(user.puzzleHistory ? user.puzzleHistory : []), thisPuzzleData];

                await fetch(`/api/users/${user.userId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        elo: newElo,
                        wins: user.wins + (won ? 1 : 0),
                        losses: user.losses + (won ? 0 : 1),
                        activePuzzle: null,
                        puzzleHistory: puzzleHistory
                    }),
                });
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }

        if (isWin) {
            handleResult(user, puzzleData, true);
        } else if (isLoss) {
            handleResult(user, puzzleData, false);
        }
    }, [isWin, isLoss])

    // Check for win
    useEffect(() => {
        if (!user || !puzzleData || !puzzleData.board || !puzzleData.solution) return;

        function isWon(board: number[][], solution: number[][]) {
            for (let i = 0; i <= 9; i++) {
                for (let j = 0; i <= 9; i++) {
                    if (board[i][j] !== solution[i][j]) {
                        return false;
                    }
                }
            }

            return true;
        }



        if (isWon(puzzleData.board, puzzleData.solution)) {
            setIsWin(true);
        }
    }, [puzzleData?.board])

    // Update activePuzzle
    useEffect(() => {
        if (!puzzleData || !user) return;

        async function updateActivePuzzle(user: IUser, puzzleData: PuzzleData) {
            try {
                await fetch(`/api/users/${user.userId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        activePuzzle: {
                            puzzleId: puzzleData.puzzleId,
                            startTime: puzzleData.startTime,
                            strikeCount: puzzleData.strikeCount,
                            board: puzzleData.board
                        }
                    })
                })
            } catch (error) {
            }
        }

        if (!isWin && !isLoss) {
            updateActivePuzzle(user, puzzleData);
        }

    }, [puzzleData?.board, puzzleData?.strikeCount])

    function handleCellChange(row: number, col: number, newValue: number) {
        if (!puzzleData) {
            return false;
        }

        if (puzzleData.solution[row][col] !== newValue) {
            onWrong();
            return false;
        }

        setPuzzleData((prev) => {
            if (!prev) return null;

            const newBoard = prev.board.map((r, rIdx) =>
                r.map((c, cIdx) => {
                    return rIdx === row && cIdx === col ? newValue : c;
                })
            );

            return {
                ...prev,
                board: newBoard,
            };
        });

        return true;
    };

    function onWrong() {
        if (!puzzleData) return;

        setPuzzleData(prev => {
            if (!prev) return null;

            const newStrikeCount = Math.min(3, prev.strikeCount + 1);

            if (newStrikeCount >= 3) {
                setIsLoss(true);
            }

            return {
                ...prev,
                strikeCount: newStrikeCount,
            };
        })


    }

    if (!user || !puzzleData || !puzzleData.board) {
        const blankPuzzle = [[], [], [], [], [], [], [], [], []].map(() => [0, 0, 0, 0, 0, 0, 0, 0, 0]);

        return (
            <div>
                <div className="absolute w-full h-full z-50" />
                <div className="flex justify-center">
                    <table>
                        <tbody>
                            {blankPuzzle.map((row, rowIndex) => (
                                <tr className="normal-tr" key={rowIndex}>
                                    {row.map((value, colIndex) => (
                                        <td className="normal-td" key={colIndex}>
                                            <Cell
                                                digit={value}
                                                onChange={(newValue) => handleCellChange(rowIndex, colIndex, newValue)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center flex-col gap-2">

            <SudokuPuzzle board={puzzleData.board} handleCellChange={handleCellChange} />
            <GameInfo time={puzzleData.time} strikeCount={puzzleData.strikeCount} elo={user.elo} puzzleElo={puzzleData.elo} />
            {
                isWin || isLoss && <WinLossScreen time={puzzleData.time} strikeCount={puzzleData.strikeCount} elo={user.elo} puzzleElo={puzzleData.elo} won={isWin} />
            }
        </div>
    );
}