const SCORING_FACTOR = 400;
const K_FACTOR = 32;

export interface GameEloInfo {
    win: number,
    loss: number
}

export function getEloInfo(playerElo: number, puzzleDifficulty: number): GameEloInfo {
    const expectedScore = 1 / (1 + Math.pow(10, (puzzleDifficulty - playerElo) / 400));
    const ifWin = Math.max(playerElo + 1, Math.round(playerElo + K_FACTOR * (1 - expectedScore)));
    const ifLoss = Math.min(playerElo - 1, Math.round(playerElo + K_FACTOR * (0 - expectedScore)));
    return { win: ifWin, loss: ifLoss };
}
