import Puzzle from '@/models/Puzzle';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const puzzle = await Puzzle.create(body);
        return NextResponse.json({ success: true, puzzle: puzzle.toObject() }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const minElo = parseInt(searchParams.get('minElo') || '400', 10);
    const maxElo = parseInt(searchParams.get('maxElo') || '2000', 10);

    try {
        const randomPuzzle = await Puzzle.aggregate([
            { $match: { elo: { $gte: minElo, $lte: maxElo } } },
            { $sample: { size: 1 } }
        ]);

        if (randomPuzzle.length === 0) {
            return NextResponse.json({ success: false, error: 'No puzzles found within the specified Elo range.' }, { status: 404 });
        }

        const sanitizedPuzzle = randomPuzzle[0];
        return NextResponse.json({ success: true, puzzle: sanitizedPuzzle }, { status: 200 });
    } catch (error) {
        console.error('Error fetching puzzle:', error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}