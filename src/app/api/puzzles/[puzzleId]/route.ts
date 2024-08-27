import Puzzle from '@/models/Puzzle';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params: { puzzleId } }: { params: { puzzleId: string } }) {
    try {
        const puzzle = await Puzzle.findById(puzzleId).exec();
        if (!puzzle) {
            return NextResponse.json({ success: false, message: 'Puzzle not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, puzzle: puzzle.toObject() }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}