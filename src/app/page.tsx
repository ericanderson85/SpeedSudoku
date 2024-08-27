import getUserData from "@/lib/userData";
import Link from "next/link";



export default async function Home() {
  const user = await getUserData();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Link href="/play" className="text-4xl font-semibold mt-4">Play</Link>
      <Link href="/leaderboard" className="text-4xl font-semibold">Leaderboard</Link>
      <div className="mb-12">
        {
          user ?
            <Link href="/me" className="text-4xl font-semibold">Profile</Link>
            :
            <Link href="/api/auth/login" className="text-4xl font-semibold">Log In / Sign Up</Link>
        }
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl font-medium">How it works:</h1>
        <p>You get 5 minutes to finish a sudoku puzzle with a difficulty matched to your Elo score.</p>
        <p>If you misplace a digit you gain a strike. After three strikes you lose the puzzle.</p>
        <p>After each win or loss, your Elo increases or decreases based on the difficulty of the puzzle you just completed.</p>
      </div>
    </div>
  );
}