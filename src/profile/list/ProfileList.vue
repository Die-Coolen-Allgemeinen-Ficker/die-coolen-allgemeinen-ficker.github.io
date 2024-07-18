<script setup lang="ts">
import { createApp } from 'vue';
import {
    AccountData,
    validateAccessToken
} from '../../account';
import Navbar from '../../components/Navbar.vue';
import SearchList from '../../components/SearchList.vue';
import { Cookie } from '../../cookie';
import LoadingScreen from '../../components/LoadingScreen.vue';
</script>

<script lang="ts">
export default {
    async mounted () {
        if (!(await validateAccessToken()))
            return;

        const accessToken: string = Cookie.getData().accessToken;
        const request = new XMLHttpRequest();
        request.open('GET', 'https://bcaf-api.purplemoss-6328e4b6.germanywestcentral.azurecontainerapps.io/v1/accounts/list');
        request.setRequestHeader('authorization', accessToken);
        request.onreadystatechange = () => {
            if (!(request.readyState == 4 && request.status == 200))
                return;

            const accountData = (JSON.parse(request.response).response as AccountData[]).sort((a, b) => a.name.localeCompare(b.name));

            const entries = accountData.map(account => {
                const a = document.createElement('a');
                a.href = `/profile/?user=${account.userId}`;
                a.style.display = 'flex';
                a.style.backgroundColor = account.profile.color;
                a.style.borderRadius = '9999px';
                a.style.color = '#ffffff';
                a.style.height = '2.5em';
                a.style.margin = '0.25em';
                a.style.width = '11em';

                const img = document.createElement('img');
                img.src = account.avatarUrl || '/assets/images/default_pfp.svg';
                img.style.borderRadius = '50%';
                img.style.height = '2.5em';
                img.style.marginRight = '0.5em';
                a.appendChild(img);

                const h3 = document.createElement('h3');
                h3.innerText = account.name;
                h3.style.height = '2em';
                h3.style.marginTop = 'auto';
                h3.style.width = '7.5em';
                h3.style.textOverflow = 'ellipsis';
                h3.style.overflow = 'hidden';
                h3.style.whiteSpace = 'nowrap';
                a.appendChild(h3);

                return a;
            });

            const searchContainer = document.getElementById('searchContainer')!;
            createApp(SearchList, { entries }).mount(searchContainer);

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
        <!--<div class="container">
            <h1>⚠️ Hinweis ⚠️</h1>
            <p>Das BCAF Account System ist momentan in der Public Beta und besitzt nur die grundlegensten Funktionen.<br>Weitere Features sollten nach und nach in der nahen Zukunft kommen.</p>
        </div>-->
        <div class="container">
            <h1>BCAF Benutzer Suche</h1>
            <div id="searchContainer"></div>
        </div>
        <p style="position: relative; text-align: center; color: gray">Powered by Github Pages<br>© 2024 Die Coolen Allgemeinen Ficker</p>
    </div>
</template>

<style scoped>
</style>