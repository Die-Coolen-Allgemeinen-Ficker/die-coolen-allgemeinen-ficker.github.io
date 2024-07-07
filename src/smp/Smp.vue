<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import Card from '../components/Card.vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import { Cookie } from '../cookie';
</script>

<script lang="ts">
export default {
    async mounted () {
        const accessToken: string = Cookie.getData().accessToken;
        const request = new XMLHttpRequest();
        request.open('GET', `https://bcaf-api.purplemoss-6328e4b6.germanywestcentral.azurecontainerapps.io/v1/smp/info`);
        request.setRequestHeader('authorization', accessToken);
        request.onreadystatechange = () => {
            if (request.readyState != 4)
                return;

            if (request.status !== 200)
                return alert('Etwas ist schiefgegangen.');

            const smps = JSON.parse(request.response).response;
            for (const smp of smps) {
                const div = document.createElement('div');
                div.classList.add('container');
                const h1 = document.createElement('h1');
                h1.innerText = smp.name;
                const p = document.createElement('p');
                p.innerText = `${smp.description}\n${smp.ip ? `IP: ${smp.ip}` : 'Anmelden um IP zu zeigen'}\nVersion: ${smp.version}${smp.modpack ? `\nModpack: ${smp.modpack}` : ''}\nStartet: ${new Date(smp.startingTimestamp).toUTCString()}`;
                div.appendChild(h1);
                div.appendChild(p);
                const insert = document.getElementById('smpInsert')!;
                insert.before(div);
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
            <h1>🅱CAF SMP</h1>
            <p>
            Der beste Discord Server aller Zeiten hat auch seinen eigenen Minecraft Server, hier ist solange man kein Hurensohn ist alles erlaubt. Die Anzahl der Slots ist unbegrenzt, also sind alle Gäste willkommen.
            </p>
        </div>
        <div style="width: 100%;">
            <div id="smpInsert"></div>
            <Card title="World Downloads" content="Die Downloads von vielen (aber nicht allen) alten SMP Welten inklusive Modpacks." href="/smp/worlds/" style="margin-left: 50%;" />
        </div>
        <p style="position: relative; text-align: center; color: gray">Powered by Github Pages<br>© 2024 Die Coolen Allgemeinen Ficker</p>
    </div>
</template>

<script scoped>
</script>