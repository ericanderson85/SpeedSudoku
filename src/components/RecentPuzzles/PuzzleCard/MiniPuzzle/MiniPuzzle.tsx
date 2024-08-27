"use server"

import MiniPuzzleCell from "./MiniPuzzleCell/MiniPuzzleCell";

interface MiniPuzzleProps {
    puzzle: number[][],
}

export default async function MiniPuzzle({ puzzle }: MiniPuzzleProps) {
    return (
        <div className="flex justify-center">
            <table>
                <tbody>
                    {puzzle.map((row, rowIndex) => (
                        <tr className="mini-tr" key={rowIndex}>
                            {row.map((value, colIndex) => (
                                <td className="mini-td" key={colIndex}>
                                    <MiniPuzzleCell digit={value} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
