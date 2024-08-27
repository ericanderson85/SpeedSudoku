import mongoose from "mongoose"

export interface IPuzzle {
    _id: string,
    elo: number,
    board: number[][],
    solution: number[][]
}

const puzzleSchema = new mongoose.Schema({
    elo: {
        type: Number,
        required: true,
    },
    board: {
        type: [[Number]],
        required: true,
    },
    solution: {
        type: [[Number]],
        required: true,
    },
});

export default mongoose.models.Puzzle || mongoose.model('Puzzle', puzzleSchema);