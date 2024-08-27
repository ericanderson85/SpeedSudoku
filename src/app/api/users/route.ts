import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const user = await User.create(body);

        console.log(user);

        return NextResponse.json({ success: true, user: user.toObject() }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function GET(_: NextRequest) {
    try {
        const users = await User.find().exec();
        return NextResponse.json({ success: true, users: users.map((user) => user.toObject()) }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}