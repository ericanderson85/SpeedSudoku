import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params: { userId } }: { params: { userId: string } }) {
    try {
        const user = await User.findOne({ userId: userId }).exec();
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, user: user.toObject() }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params: { userId } }: { params: { userId: string } }) {
    try {
        const body = await req.json();

        const user = await User.findOneAndUpdate({ userId: userId }, body, {
            new: true,
            runValidators: true,
        }).exec();

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, user: user.toObject() }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
