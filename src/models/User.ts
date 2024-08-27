import mongoose from "mongoose";

export interface PreviousPuzzle {
    puzzleId: string;
    completionTimeSeconds: number;
    score: number;
    timestamp: Date;
    _id?: string;
}

export interface ActivePuzzle {
    puzzleId: string,
    startTime: Date,
    strikeCount: number,
    board: number[][]
}

export interface IUser {
    username: string;
    userId: string;
    email: string;
    signUpDate: Date;
    elo: number;
    wins: number;
    losses: number;
    activePuzzle?: ActivePuzzle;
    puzzleHistory?: Array<PreviousPuzzle>;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
    },
    signUpDate: {
        type: Date,
        default: Date.now,
    },
    elo: {
        type: Number,
        default: 1000,
    },
    wins: {
        type: Number,
        default: 0,
    },
    losses: {
        type: Number,
        default: 0,
    },
    activePuzzle: {
        type: {
            puzzleId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Puzzle',
                required: true,
            },
            startTime: {
                type: Date,
                required: true,
            },
            strikeCount: {
                type: Number,
                required: true,
            },
            board: {
                type: [[Number]],
                required: true,
            }
        },
        default: null
    },
    puzzleHistory: {
        type: [{
            puzzleId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Puzzle',
                required: true,
            },
            completionTimeSeconds: {
                type: Number,
                required: true,
            },
            score: {
                type: Number,
                required: true,
            },
            timestamp: {
                type: Date,
                required: true,
            },
        }],
        default: []
    }
});

export default mongoose.models.User || mongoose.model('User', userSchema);