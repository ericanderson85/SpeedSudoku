interface GameInfoProps {
    time: number,
    strikeCount: number,
    elo: number,
    puzzleElo: number
}

export default function ({ time, strikeCount, elo, puzzleElo }: GameInfoProps) {
    function formatTime(timeSeconds: number) {
        const minutes = Math.floor(timeSeconds / 60);
        const seconds = timeSeconds - (minutes * 60);

        return `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;
    }

    return (
        <div className="grid grid-rows-2 grid-cols-2 gap-y-2 gap-x-14">
            <div className="flex items-center justify-between w-60">
                <span>Time remaining:</span>
                <div className="flex items-center justify-center bg-gray rounded-md w-12">
                    <span>{formatTime(time)}</span>
                </div>
            </div>
            <div className="flex items-center justify-between w-60">
                <span>Strikes:</span>
                <div className="flex items-center justify-center bg-gray rounded-md w-12">
                    <span>{strikeCount}/3</span>
                </div>
            </div>
            <div className="flex items-center justify-between w-60">
                <span>Puzzle Elo:</span>
                <div className="flex items-center justify-center bg-gray rounded-md w-12">
                    <span>{puzzleElo}</span>
                </div>
            </div>
            <div className="flex items-center justify-between w-60">
                <span>Your Elo:</span>
                <div className="flex items-center justify-center bg-gray rounded-md w-12">
                    <span>{elo}</span>
                </div>
            </div>
        </div>
    )
}