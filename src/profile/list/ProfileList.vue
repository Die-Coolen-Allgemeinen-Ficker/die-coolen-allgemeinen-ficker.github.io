<script setup lang="ts">
import { createApp } from 'vue';
import {
    AccountData,
    validateAccessToken
} from '../../account';
import Navbar from '../../components/Navbar.vue';
import SearchList from '../../components/SearchList.vue';
import { Cookie } from '../../cookie';
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
                a.innerText = account.name;
                a.href = `/profile/?user=${account.userId}`;

                return a;
            });

            const searchContainer = document.getElementById('searchContainer')!;
            createApp({ extends: SearchList }, { entries }).mount(searchContainer);
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
        <div class="container">
            <h1>BCAF Benutzer Suche</h1>
            <div id="searchContainer"></div>
        </div>
        <p style="position: relative; text-align: center; color: gray">Powered by Github Pages<br>© 2024 Die Coolen Allgemeinen Ficker</p>
    </div>
</template>

<style scoped>
</style>