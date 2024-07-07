<script setup lang="ts">
import { Cookie } from '../cookie';
</script>

<script lang="ts">
export default {
    mounted () {
        const user = Cookie.getData().user;
        if (user) {
            const data = JSON.parse(user);
            (document.getElementById('navbarPfp') as HTMLImageElement).src = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`;
            document.getElementById('logout')!.style.display = 'inherit';
        }
    },
    methods: {
        logout () {
            Cookie.delete();
            window.location.reload();
        }
    }
}
</script>

<template>
    <div class="navbar">
        <a href="/"><img src="/assets/images/bcaf.png"></a>
        <a href="/my-account/"><img src="/assets/images/default_pfp.svg" style="border-radius: 50%;" id="navbarPfp"></a>
        <a href="/profile/list/"><img src="/assets/images/search.png" style="border-radius: 50%;"></a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src="/assets/images/discord.svg"></a>
        <a href="/smp/"><img src="/assets/images/minecraft.png"></a>
        <a href="https://github.com/Die-Coolen-Allgemeinen-Ficker"><img src="/assets/images/github.png"></a>
        <button v-on:click="logout" id="logout">Abmelden</button>
    </div>
</template>

<style scoped>
.navbar {
    background-color: #1a1a1a;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
}
.navbar a {
    float: left;
    color: white;
    text-align: center;
    padding: 1em 1em;
    text-decoration: none;
    font-size: 1em;
}
.navbar a:hover {
    background-color: #333333;
}
.navbar img {
    object-fit: contain;
    width: 2em;
}
.navbar button {
    margin-top: 1em;
    background-color: #e64d4d;
    display: none;
    margin-left: auto;
    margin-right: 5%;
}
</style>