<script setup lang="ts">
import { createApp } from 'vue';
import {
    AccountData,
    validateAccessToken
} from '../account';
import Navbar from '../components/Navbar.vue';
import Profile from '../components/Profile.vue';
import { Cookie } from '../cookie';
</script>

<script lang="ts">
export default {
    async mounted () {
        if (!(await validateAccessToken()))
            return;

        const cookieData = Cookie.getData();
        const accessToken: string = cookieData.accessToken;
        const clientUserId: string = JSON.parse(cookieData.user).id;
        const userId = new URLSearchParams(window.location.search).get('user');
        const request = new XMLHttpRequest();
        request.open('GET', `https://bcaf-api.purplemoss-6328e4b6.germanywestcentral.azurecontainerapps.io/v1/accounts/lookup/${userId}`);
        request.setRequestHeader('authorization', accessToken);
        request.onreadystatechange = () => {
            if (request.readyState != 4)
                return;

            if (request.status !== 200)
                return alert('Etwas ist schiefgegangen.');

            const accountData = JSON.parse(request.response).response as AccountData;
            const isAccountOwner = accountData.userId == clientUserId;
            document.title = isAccountOwner ? 'Dein Profil' : `Profil von ${accountData.name}`;

            const profileContainer = document.getElementById('profileContainer')!;
            createApp({ extends: Profile }, { accountData, isAccountOwner }).mount(profileContainer);
        }
        request.send();
    }
}
</script>

<template>
    <Navbar />
    <div style="position: absolute; width: 100%; top: 20%;">
        <div class="container">
            <h1>⚠️ Hinweis ⚠️</h1>
            <p>Das BCAF Account System ist momentan in der Public Beta und besitzt nur die grundlegensten Funktionen.<br>Weitere Features sollten nach und nach in der nahen Zukunft kommen.</p>
        </div>
        <div id="profileContainer"></div>
        <p style="position: relative; text-align: center; color: gray">Powered by Github Pages<br>© 2024 Die Coolen Allgemeinen Ficker</p>
    </div>
</template>

<style scoped>
#profileContainer {
    position: relative;
    left: 12.5%;
    width: 75%;
    text-align: left;
    padding: 1em;
    object-fit: contain;
    margin-bottom: 5em;
    padding-bottom: 150%;
}
</style>

<script scoped>
</script>