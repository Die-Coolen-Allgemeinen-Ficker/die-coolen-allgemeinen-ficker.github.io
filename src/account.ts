import { Cookie } from './cookie';

export interface AchievementData {
    name: string;
    description: string;
    timestamp?: number;
}

export interface AccountData {
    userId: string;
    name: string;
    avatarUrl: string;
    profile: {
        level: number;
        color: string;
        backgroundImageUrl: string;
        foregroundImageUrl: string;
        minecraftUuid: string | null;
        socialCredit: {
            amount: number;
            tier: string;
        };
        games: {
            snakeHighscore: number;
            tictactoeWins: number;
        };
        messageStats: {
            nWordCount: number;
            bReactionCount: number;
            messageCount: number;
            messagesLast30Days: number;
            yapOMeter: number;
        };
        achievements: AchievementData[];
    };
    bcafCoin: number;
    hasBoostedBefore: boolean;
    hasPlayedLeagueOfLegends: boolean;
    bcafJoinTimestamp: number;
    legacy: boolean;
    createdTimestamp: number;
    updatedTimestamp: number;
}

export function validateAccessToken () {
    return new Promise<boolean>((resolve, _) => {
        const accessToken: string = Cookie.getData().accessToken;

        const request = new XMLHttpRequest();
        request.open('GET', 'https://discord.com/api/users/@me');
        request.setRequestHeader('authorization', `Bearer ${accessToken}`);
        request.onreadystatechange = () => {
            if (request.readyState == 4) {
                if (request.status == 401) {
                    Cookie.delete();
                    window.location.replace(`/my-account/?redirect=${encodeURIComponent(`${window.location.pathname}${window.location.search}`)}`);
                    resolve(false);
                    return
                }
                resolve(true);
            }
        }
        request.send();
    });
}