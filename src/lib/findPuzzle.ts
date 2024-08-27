import { IUser } from "@/models/User";

const TIME_TO_COMPLETE_PUZZLE_SECONDS = 300;

export interface PuzzleData {
    board: number[][],
    solution: number[][],
    elo: number,
    strikeCount: number,
    time: number,
    puzzleId: string,
    startTime: Date
}


export default async function findPuzzle(user: IUser): Promise<PuzzleData | null> {
    try {
        const playerElo = user.elo;
        const boundedPlayerElo = Math.min(1980, Math.max(playerElo, 420));
        let foundPuzzle = false;
        const now = new Date();

        let board;
        let solution;
        let elo;
        let strikeCount = 0;
        let time = TIME_TO_COMPLETE_PUZZLE_SECONDS;
        let puzzleId;
        let startTime = new Date();

        if (user.activePuzzle) {

            const activePuzzleStart = new Date(user.activePuzzle.startTime)
            const timeSinceStart = Math.floor((now.getTime() - activePuzzleStart.getTime()) / 1000);

            if (timeSinceStart < TIME_TO_COMPLETE_PUZZLE_SECONDS) {
                const response = await fetch(`/api/puzzles/${user.activePuzzle.puzzleId}`);
                const data = await response.json();
                if (response.ok) {
                    board = user.activePuzzle.board;
                    solution = data.puzzle.solution;
                    elo = data.puzzle.elo;
                    time -= timeSinceStart;
                    strikeCount = user.activePuzzle.strikeCount;
                    puzzleId = data.puzzle._id.toString();
                    startTime = user.activePuzzle.startTime;
                    foundPuzzle = true;
                } else {
                    console.error('Error fetching puzzle:', data.message);
                }
            }

            if (!foundPuzzle) {
            }
        }

        if (!foundPuzzle) {

            const response = await fetch(`/api/puzzles?minElo=${boundedPlayerElo - 20}&maxElo=${boundedPlayerElo + 20}`);
            const data = await response.json();
            if (response.ok) {
                board = data.puzzle.board;
                solution = data.puzzle.solution;
                elo = data.puzzle.elo;
                puzzleId = data.puzzle._id.toString();

                await fetch(`/api/users/${user.userId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        activePuzzle: {
                            puzzleId: puzzleId,
                            startTime: now,
                            strikeCount: strikeCount,
                            board: board,
                        }
                    }),
                });
            }
            else {
                console.error('Error fetching puzzle:', data.message);
            }
        }

        const puzzleData = {
            board,
            solution,
            elo,
            strikeCount,
            time,
            puzzleId,
            startTime
        }

        return puzzleData;
    } catch (error) {
        console.error('Error fetching puzzle:', error);

        return null;
    }
}