import { getEloInfo } from "@/lib/elo";

interface WinLossScreenProps {
    time: number,
    strikeCount: number,
    elo: number,
    puzzleElo: number,
    won: boolean,
}

export default function WinLossScreenProps({ time, strikeCount, elo, puzzleElo, won }: WinLossScreenProps) {
    function formatTime(timeSeconds: number) {
        const minutes = Math.floor(timeSeconds / 60);
        const seconds = timeSeconds - (minutes * 60);

        return `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;
    }

    const eloInfo = getEloInfo(elo, puzzleElo);
    const newElo = won ? eloInfo.win : eloInfo.loss;
    const eloChange = newElo - elo;
    const eloString = `${newElo}(${(won ? "+" : "") + eloChange})`;

    return (
        <div className="absolute w-full h-full z-50 flex items-center justify-center">
            <div className="h-96 py-12 px-4 top-28 absolute w-96 rounded-xl bg-gray flex items-center flex-col  justify-between border-2 border-black">
                <span className={`${won ? "text-win" : "text-loss"} text-3xl`}>{won ? "Win" : "Loss"}</span>

                <span onClick={() => window.location.reload()} className="text-3xl underline cursor-pointer">Play Again</span>

                <div className="grid grid-rows-2 grid-cols-2 gap-y-2 gap-x-14">
                    <div className="flex items-center justify-between w-30">
                        <span>Time:</span>
                        <div className="flex items-center justify-center bg-gray rounded-md w-12">
                            <span>{formatTime(time)}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-30">
                        <span>Strikes:</span>
                        <div className="flex items-center justify-center bg-gray rounded-md w-12">
                            <span>{strikeCount}/3</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-30">
                        <span>Your Elo:</span>
                        <div className="flex items-center justify-center bg-gray rounded-md w-12">
                            <span>{eloString}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-30">
                        <span>Puzzle Elo:</span>
                        <div className="flex items-center justify-center bg-gray rounded-md w-12">
                            <span>{puzzleElo}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}