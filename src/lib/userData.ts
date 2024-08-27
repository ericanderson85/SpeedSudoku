import User, { IUser, PreviousPuzzle } from "@/models/User";
import { getSession } from "@auth0/nextjs-auth0";

export default async function getUserData(): Promise<IUser | null> {
    const session = await getSession();

    if (!session) {
        console.error("No session");
        return null;
    }

    const userId = session.user.sub.split("|")[1];

    try {
        const user = await User.findOne({ userId: userId }).exec();

        if (!user) {
            console.error("User doesn't exist in database");
            return null;
        }

        const userObject = user.toObject();
        delete userObject._id;

        if (userObject.activePuzzle) {
            userObject.activePuzzle.puzzleId = userObject.activePuzzle.puzzleId.toString();
            delete userObject.activePuzzle._id;
        }

        if (userObject.puzzleHistory) {
            userObject.puzzleHistory.forEach((previous: PreviousPuzzle) => {
                previous.puzzleId = previous.puzzleId.toString();
                delete previous._id;
            })
        }

        return userObject;

    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}