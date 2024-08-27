import RecentPuzzles from "@/components/RecentPuzzles/RecentPuzzles";
import getUserData from "@/lib/userData";
import { redirect } from 'next/navigation'

export default async function Page() {
    const user = await getUserData()

    if (!user) {
        redirect("/api/auth/login");
    }

    const { username, signUpDate, elo, wins, losses, puzzleHistory } = user;

    const date = signUpDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="w-full h-screen flex mt-4 justify-center">
            <div className="w-5/6 h-5/6 rounded-3xl p-8">
                <div className="flex flex-col justify-center items-center w-full">
                    <span className="text-2xl font-bold mb-2">{username}</span>
                    <span>Elo: {elo}</span>
                    <span>{wins} Wins, {losses} Losses</span>
                    <span className="mb-4">Joined {date}</span>
                    <RecentPuzzles puzzleHistory={puzzleHistory} />
                </div>
            </div>
        </div>
    );
};