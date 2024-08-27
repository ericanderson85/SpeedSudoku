import Game from "@/components/Game/Game";
import { getEloInfo } from "@/lib/elo";
import getUserData from "@/lib/userData";
import { IPuzzle } from "@/models/Puzzle";
import User from "@/models/User";
import { redirect } from 'next/navigation'

export default async function Page() {
    const user = await getUserData()

    if (!user) {
        redirect("/api/auth/login");
    }

    return (
        <Game user={user} />
    );
};