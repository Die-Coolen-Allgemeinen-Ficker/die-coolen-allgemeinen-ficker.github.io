<script setup lang="ts">
import LoadingScreen from '../components/LoadingScreen.vue';
import Navbar from '../components/Navbar.vue';
import { Cookie } from '../cookie';
</script>

<script lang="ts">
export default {
    mounted () {
        const cookie = Cookie.getData();
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        const redirect = searchParams.get('redirect');
        const state = searchParams.get('state');

        if (cookie.accessToken) {
            const user = JSON.parse(cookie.user);
            window.location.replace(`/profile/?user=${user.id}`);
        } else if (code) {
            const request = new XMLHttpRequest();
            request.open('GET', 'https://bcaf-api.purplemoss-6328e4b6.germanywestcentral.azurecontainerapps.io/v1/accounts/auth');
            request.setRequestHeader('authorization', code);
            request.onreadystatechange = () => {
                if (request.readyState != 4)
                    return;

                if (request.status != 200)
                    return alert('Etwas ist schiefgegangen');

                const json = JSON.parse(request.response);

                if (json.response.error)
                    return alert(`Etwas ist schiefgegangen: ${json.response.error}`);

                Cookie.setData('accessToken', json.response.token.access_token);
                Cookie.setData('refreshToken', json.response.token.refresh_token);
                Cookie.setData('user', JSON.stringify(json.response.user));
                window.location.replace(state ? decodeURIComponent(state) : `/profile/?user=${json.response.user.id}`);
            }
            request.send();
        } else {
            const accountView = document.getElementById('account-view');

            const p = document.createElement('p');
            p.innerHTML = 'Du bist nicht angemeldet.';
            accountView?.appendChild(p);

            const a = document.createElement('a');
            a.innerHTML = 'Anmelden';
            a.href = `https://discord.com/oauth2/authorize?client_id=1098658997684412476&response_type=code&redirect_uri=https%3A%2F%2Fdie-coolen-allgemeinen-ficker.github.io%2Fmy-account%2F&scope=identify+guilds${redirect ? `&state=${encodeURIComponent(redirect)}` : ''}`;
            a.className = 'click';
            accountView?.appendChild(a);

            document.getElementById('loadingScreen')?.classList.add('hidden');
            setTimeout(() => {document.getElementById('loadingScreen')?.remove();}, 500);
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
        <div class="container" id="account-view">
            <h1>Dein Account</h1>
        </div>
        <p style="position: relative; text-align: center; color: gray">Powered by Github Pages<br>© 2024 Die Coolen Allgemeinen Ficker</p>
    </div>
</template>

<script scoped>
</script>