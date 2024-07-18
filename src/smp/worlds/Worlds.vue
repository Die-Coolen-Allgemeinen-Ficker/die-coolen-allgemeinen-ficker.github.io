<script setup lang="ts">
import { createApp } from 'vue';
import { validateAccessToken } from '../../account';
import Card from '../../components/Card.vue';
import LoadingScreen from '../../components/LoadingScreen.vue';
import Navbar from '../../components/Navbar.vue';
import { Cookie } from '../../cookie';
</script>

<script lang="ts">
export default {
    async mounted () {
        if (!(await validateAccessToken()))
            return;

        const accessToken: string = Cookie.getData().accessToken;
        const request = new XMLHttpRequest();
        request.open('GET', `https://bcaf-api.purplemoss-6328e4b6.germanywestcentral.azurecontainerapps.io/v1/smp/worlds`);
        request.setRequestHeader('authorization', accessToken);
        request.onreadystatechange = () => {
            if (request.readyState != 4)
                return;

            if (request.status !== 200)
                return alert('Etwas ist schiefgegangen.');

            const worlds = JSON.parse(request.response).response;
            for (const world of worlds) {
                const worldsContainer = document.getElementById('worldsContainer')!;
                const div = document.createElement('div');
                worldsContainer.appendChild(div);
                createApp(Card, { title: world.name, content: `Version: ${world.version}${world.modpack ? `\nModpack: ${world.modpack}` : ''}`, href: world.download, banner: world.banner }).mount(div);
            }

            document.getElementById('loadingScreen')?.classList.add('hidden');
            setTimeout(() => {document.getElementById('loadingScreen')?.remove();}, 500);
        }
        request.send();
    }
}
</script>

<template>
    <Navbar />
    <LoadingScreen />
    <div style="position: absolute; width: 100%; top: 20%;">
        <div class="container">
            <h1>SMP World Downloads</h1>
            <p>
            Hier sind alle World Downloads von alten SMP Welten die existieren, manche Worlds sind verloren gegangen womp womp.
            </p>
        </div>
        <div id="worldsContainer" style="width: 100%; margin-left: 50%;"></div>
        <p style="position: relative; text-align: center; color: gray">Powered by Github Pages<br>© 2024 Die Coolen Allgemeinen Ficker</p>
    </div>
</template>

<style scoped>
</style>