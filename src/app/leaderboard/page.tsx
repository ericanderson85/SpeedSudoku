"use server"

import User, { IUser } from "@/models/User";

export default async function Page() {
    let topThree;

    try {
        topThree = await User.find({}).sort({ elo: -1 }).limit(3).exec();
    } catch (error) {
        console.error(error);
        return (
            <>{error}</>
        )
    }

    const one = topThree[0]?.toObject();
    const two = topThree[1]?.toObject();
    const three = topThree[2]?.toObject();

    return (
        <div className="w-full h-screen flex mt-4 justify-center">
            <div className="w-5/6 h-5/6 bg-gray rounded-3xl p-8 flex items-center flex-col justify-between">
                <h1 className="text-4xl underline font-medium">Leaderboard</h1>

                <div className="flex justify-center items-end gap-8 w-full">

                    <div className="flex items-center justify-end flex-col">
                        <span>{two.username}</span>
                        <div className="bg-silver w-32 h-32 flex items-center justify-center flex-col">
                            <span>{two.elo} Elo</span>
                            <span>{two.wins} Wins</span>
                            <span>{two.losses} Losses</span>
                        </div>
                    </div>


                    <div className="flex items-center justify-center flex-col">
                        <span>{one.username}</span>
                        <div className="bg-gold w-32 h-40 flex items-center justify-center flex-col">
                            <span>{one.elo} Elo</span>
                            <span>{one.wins} Wins</span>
                            <span>{one.losses} Losses</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center flex-col">
                        <span>{three.username}</span>
                        <div className="bg-bronze w-32 h-24 flex items-center justify-center flex-col">
                            <span>{three.elo} Elo</span>
                            <span>{three.wins} Wins</span>
                            <span>{three.losses} Losses</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};