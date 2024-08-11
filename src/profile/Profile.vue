<script setup lang="ts">
import { createApp } from 'vue';
import {
    AccountData,
    validateAccessToken
} from '../account';
import Navbar from '../components/Navbar.vue';
import Profile from '../components/Profile.vue';
import { Cookie } from '../cookie';
import LoadingScreen from '../components/LoadingScreen.vue';
</script>

<script lang="ts">
export default {
    async mounted () {
        if (!(await validateAccessToken()))
            return;

        const cookieData = Cookie.getData();
        const accessToken: string = cookieData.accessToken;
        const clientUserId: string = JSON.parse(cookieData.user).id;
        const urlSearchParams = new URLSearchParams(window.location.search);
        const userId = urlSearchParams.get('user') || urlSearchParams.get('state');
        const code = urlSearchParams.get('code');

        if (code) {
            // request
            console.log(code);

            //window.location.replace(`/profile/?user=${userId}`);
        } else {
            const request = new XMLHttpRequest();
            request.open('GET', `https://die-coolen-allgemeinen-ficker.github.io/api/v1/accounts/lookup/${userId}`);
            request.setRequestHeader('authorization', accessToken);
            request.onreadystatechange = () => {
                if (request.readyState != 4)
                    return;

                if (request.status !== 200)
                    return alert('Etwas ist schiefgegangen.');

                const accountData = JSON.parse(request.response).response as AccountData;
                const isAccountOwner = accountData.userId == clientUserId;
                document.title = isAccountOwner ? 'Mein Profil' : `Profil von ${accountData.name}`;

                const profileContainer = document.getElementById('profileContainer')!;
                createApp(Profile, { accountData, isAccountOwner }).mount(profileContainer);

                document.getElementById('loadingScreen')?.classList.add('hidden');
                setTimeout(() => {document.getElementById('loadingScreen')?.remove();}, 500);
            }
            request.send();
        }
    }
}
</script>

<template>
    <Navbar />
    <LoadingScreen />
    <div style="position: absolute; width: 100%; top: 20%;">
        <!--<div class="container">
            <h1>⚠️ Hinweis ⚠️</h1>
            <p>Das BCAF Account System ist momentan in der Public Beta und besitzt nur die grundlegensten Funktionen.<br>Weitere Features sollten nach und nach in der nahen Zukunft kommen.</p>
        </div>-->
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