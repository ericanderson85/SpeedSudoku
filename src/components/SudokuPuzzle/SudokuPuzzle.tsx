"use client"

import Cell from './Cell/Cell';

interface SudokuPuzzleProps {
    board: number[][],
    handleCellChange: (row: number, col: number, digit: number) => boolean
}

export default function SudokuPuzzle({ board, handleCellChange }: SudokuPuzzleProps) {
    return (
        <div className="flex justify-center">
            <table>
                <tbody>
                    {board.map((row, rowIndex) => (
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
    );
};
