import Link from "next/link";
import ProfileButton from "../ProfileButton/ProfileButton";

export default function Header() {
    return (
        <div className="flex justify-between items-center p-2">
            <Link href="/"><span className="font-medium text-xl">Speed Sudoku</span></Link>
            <ProfileButton />
        </div>
    );
}