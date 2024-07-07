<script setup lang="ts">
import {
    AccountData,
    AchievementData
} from '../account';
import Dropdown from './Dropdown.vue';

defineProps<{
    accountData: AccountData,
    isAccountOwner: boolean
}>();
</script>

<script lang="ts">
import achievements from '../data/achievements.json';
import { createApp } from 'vue';
import { Cookie } from '../cookie';

export default {
    achievements,
    async mounted () {
        const p = document.getElementById('minecraftUsername');
        p!.innerText = this.accountData.profile.minecraftUuid ? await this.getMinecraftUserName(this.accountData.profile.minecraftUuid) : '';

        const dropdownContainer = document.getElementById('dropdownContainer')!;
        createApp(Dropdown, { name: 'Liste', color: this.accountData.profile.color, content: this.achievementList(this.accountData.profile.achievements) }).mount(dropdownContainer);
    },
    methods: {
        getMinecraftUserName (uuid: string): Promise<string> {
            return new Promise((resolve, _) => {
                const request = new XMLHttpRequest();
                request.open('GET', `https://bcaf-api.purplemoss-6328e4b6.germanywestcentral.azurecontainerapps.io/v1/minecraft/name/${uuid}`);
                request.onreadystatechange = () => {
                    if (request.readyState != 4)
                        return;

                    if (request.status != 200) {
                        resolve('Minecraft Username konnte nicht abgefragt werden');
                        return;
                    }

                    resolve(JSON.parse(request.response).response);
                }
                request.send();
            });
        },
        achievementList (data: AchievementData[]) {
            const names = data.map(achievement => achievement.name);
            return [ ...data, ...(achievements as AchievementData[]).filter(achievement => !names.includes(achievement.name)) ].map(achievement => {
                const p = document.createElement('p');
                p.innerText = `${achievement.name} - ${achievement.description}${achievement.timestamp ? `\n${new Date(achievement.timestamp).toUTCString()}` : ''}`;
                p.style.backgroundColor = this.accountData.profile.color;
                p.style.display = 'content';
                if (!names.includes(achievement.name))
                    p.style.color = 'gray';
                return p;
            });
        },
        validateUrl (url: string) {
            try {
                new URL(url);
                return true;
            } catch (_) {
                return false;
            }
        },
        openEdit () {
            document.getElementById('edit')!.style.height = '80%';
        },
        closeEdit () {
            document.getElementById('edit')!.style.height = '0%';
        },
        saveEdit () {
            const body: {
                color?: string;
                backgroundImageUrl?: string;
                foregroundImageUrl?: string;
            } = {};
            const color = (document.getElementById('editColor') as HTMLInputElement).value;
            const backgroundImageUrl = (document.getElementById('editBackgroundImageUrl') as HTMLInputElement).value;
            const foregroundImageUrl = (document.getElementById('editForegroundImageUrl') as HTMLInputElement).value;
            body.color = color;
            if (!this.validateUrl(backgroundImageUrl))
                return alert('backgroundImageUrl muss eine gültige URL sein.');
            body.backgroundImageUrl = backgroundImageUrl;
            if (foregroundImageUrl !== '' && !this.validateUrl(foregroundImageUrl))
                return alert('foregroundImageUrl muss eine gültige URL sein.');
            body.foregroundImageUrl = foregroundImageUrl;
            console.log(body);

            const accessToken: string = Cookie.getData().accessToken;
            const request = new XMLHttpRequest();
            request.open('POST', `https://bcaf-api.purplemoss-6328e4b6.germanywestcentral.azurecontainerapps.io/v1/accounts/lookup/${this.accountData.userId}`);
            request.setRequestHeader('authorization', accessToken);
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            request.onreadystatechange = () => {
                if (request.readyState != 4)
                    return;

                if (request.status != 200)
                    return alert(`Etwas ist schiefgegangen: ${JSON.parse(request.response).response}`);

                setTimeout(() => { window.location.reload(); }, 1000);
            }
            request.send(JSON.stringify(body));
        }
    }
}
</script>

<template>
    <LoadingScreen />
    <div id="edit" class="edit" v-bind:style="{ backgroundColor: `${accountData.profile.color}` }">
        <div style="margin: 5%;">
            <button v-on:click="closeEdit">&times;</button>
            <h1>Account Einstellungen</h1>
            <p>Hier kannst du deine Account Einstellungen ändern und dein Profil customizen.</p>
            <h2>Microsoft Account (Minecraft Java Edition) verknüpfen</h2>
            <p>Coming <i>soon™</i> (Falls nicht bereits verknüpft)</p>
            <h2>Profil</h2>
            <h3>Profilfarbe</h3>
            <input id="editColor" v-bind:value="accountData.profile.color" placeholder="Hex Farbe (#xxxxxx)">
            <h3>Hintergrundbild*</h3>
            <input id="editBackgroundImageUrl" v-bind:value="accountData.profile.backgroundImageUrl" placeholder="Direkte Dateien URL">
            <h3>Vordergrundbild*</h3>
            <input id="editForegroundImageUrl" v-bind:value="accountData.profile.foregroundImageUrl" placeholder="Direkte Dateien URL">
            <p>*Muss eine direkte Dateien URL sein.<br>Seit 2024 möchte Discord nicht mehr als File Host benutzt werden (cringe), somit sind Discord Attachment Links nur noch für 24 Stunden gültig und können deswegen nicht als Dateien URL benutzt werden.</p>
            <button v-on:click="saveEdit">Speichern</button>
        </div>
    </div>

    <div v-bind:style="{ backgroundImage: `url(${accountData.profile.foregroundImageUrl})` }" style="background-size: cover; height: 110em; width: 100%; position: absolute; opacity: 0.8; z-index: 1; pointer-events: none;"></div>
    <div class="profile" v-bind:style="{ backgroundImage: `url(${accountData.profile.backgroundImageUrl})`, borderColor: accountData.profile.color }">
        <div class="top" v-bind:style="{ backgroundColor: `${accountData.profile.color}55` }">
            <div style="display: flex;">
                <img v-bind:src="accountData.avatarUrl" style="border-radius: 50%;">
                <div class="name">
                    <h1 style="margin-top: 0; margin-bottom: 0;">{{ accountData.name }}</h1>
                    <p id="minecraftUsername" style="margin-top: 0;"></p>
                </div>
                <div class="badges">
                    <button class="badge" style="margin-right: 5em;" v-bind:style="{ display: isAccountOwner ? 'inherit' : 'none' }" v-on:click="openEdit"><img class="badge" style="margin: -1em;" v-bind:style="{ display: isAccountOwner ? 'inherit' : 'none' }" src="/assets/images/edit.png"></button>
                    <img class="badge" title="Hatte ein Profil im alten Profilsystem" v-bind:style="{ display: accountData.legacy ? 'inherit' : 'none' }" src="/assets/images/bcaf.png">
                    <img class="badge" title="Hat schonmal den Server geboostet" v-bind:style="{ display: accountData.hasBoostedBefore ? 'inherit' : 'none' }" src="/assets/images/nitro.webp">
                    <img class="badge" title="Hat schonmal League of Legends gespielt" v-bind:style="{ display: accountData.hasPlayedLeagueOfLegends ? 'inherit' : 'none' }" src="/assets/images/league.png">
                </div>
            </div>
            <div class="bar" v-bind:style="{ backgroundColor: `${accountData.profile.color}`}">
                <div class="progress" v-bind:style="{ width: `${(accountData.profile.level - Math.floor(accountData.profile.level)) * 100}%`}"></div>
            </div>
            <p>Level {{ Math.floor(accountData.profile.level) }} - {{ ((accountData.profile.level - Math.floor(accountData.profile.level)) * 100).toString().slice(0, 5) }}%</p>
        </div>
        <div class="info" v-bind:style="{ backgroundColor: `${accountData.profile.color}55` }">
            <div style="display: flex;">
                <div class="divider">
                    <h3>Social Credit</h3>
                    <p>Punkte: {{ accountData.profile.socialCredit.amount }}</p>
                    <p>Stufe: {{ accountData.profile.socialCredit.tier }}</p>
                    <h3>Discord Games</h3>
                    <p>Snake Highscore: {{ accountData.profile.games.snakeHighscore }}</p>
                    <p>TicTacToe Wins: {{ accountData.profile.games.tictactoeWins }}</p>
                </div>
                <div class="divider">
                    <h3>BCAF Coin</h3>
                    <p>{{ accountData.bcafCoin }}</p>
                    <h3>Nachrichten</h3>
                    <p>Gesamt: {{ accountData.profile.messageStats.messageCount }}</p>
                    <p>Letzte 30 Tage: {{ accountData.profile.messageStats.messagesLast30Days }}</p>
                    <p>🅱 Reactions: {{ accountData.profile.messageStats.bReactionCount }}</p>
                    <p>N-Word Count: {{ accountData.profile.messageStats.nWordCount }}</p>
                    <p>Yap-O-Meter (⌀ Zeichen pro Nachricht): {{ accountData.profile.messageStats.yapOMeter }}</p>
                    <h3>BCAF Share</h3>
                    <div class="bcafShare" v-bind:style="{ backgroundColor: `${accountData.profile.color}` }">
                        <p>Coming <i>soon™</i></p>
                    </div>
                </div>
            </div>
            <h3 style="margin-bottom: 0.5em;">Achievements</h3>
            <div id="dropdownContainer" style="width: 85%"></div>
        </div>
        <div class="footer" v-bind:style="{ backgroundColor: `${accountData.profile.color}55` }">
            <p>🅱CAF Mitglied seit: {{ new Date(accountData.bcafJoinTimestamp).toUTCString() }}<br>Account seit: {{ new Date(accountData.createdTimestamp).toUTCString() }}</p>
        </div>
    </div>
</template>

<style>
.profile {
    border: solid;
    border-width: 0.5em;
    border-radius: 2em;
    padding: 2.5%;
    background-size: cover;
}

.profile p {
  font-size: 1.5em;
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.top {
    height: 15em;
    border-radius: 2em;
    padding: 2%;
    margin-bottom: 2em;
}

.name {
    padding-left: 1em;
    height: fit-content;
}

.badges {
    margin-left: auto;
    display: flex;
}

.badge {
    width: 5em;
    height: 5em;
    margin-left: 1em;
    background-color: transparent;
}

.bar {
    margin-top: 1em;
    height: 2em;
    width: 100%;
    border-radius: 1em;
}

.progress {
    width: 75%;
    height: 100%;
    background-color: #aa88ff;
    border-radius: 1em;
}

.info {
    border-radius: 2em;
    padding: 2%;
    margin-bottom: 2em;
}


.info h3 {
    margin-bottom: -0.5em;
    font-size: 3em;
}

.info p {
    font-size: 2em;
    padding-left: 2em;
}

.divider {
    width: 50%
}

.bcafShare {
  position: relative;
  width: 50%;
  text-align: left;
  border-radius: 2em;
  padding: 1em;
  object-fit: contain;
  margin-top: 10%;
}

.footer {
    border-radius: 2em;
    padding: 2%;
    text-align:center;
    color: gray;
}

.edit {
    height: 0%;
    width: 80%;
    position: fixed;
    z-index: 2;
    top: 10%;
    left: 10%;
    overflow-x: hidden;
    transition: 0.25s;
    border-radius: 2em;
}

.edit::-webkit-scrollbar {
    display: none;
}

.edit p {
  font-size: 1.5em;
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>