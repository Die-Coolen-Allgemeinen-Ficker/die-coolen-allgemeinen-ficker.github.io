<script setup lang="ts">
import Navbar from '../../components/Navbar.vue';
import SearchList from '../../components/SearchList.vue';
</script>

<template>
    <Navbar />
    <div style="position: absolute; width: 100%; top: 20%;">
        <div class="container">
            <h1>Server Modliste</h1>
            <p>Schau ob die Mods die du willst drin sind und wenn nicht dann <a href="https://www.curseforge.com/minecraft/search?page=1&gameVersion=1.12.2">such sie auf Curseforge.</a><br>Diese Liste ist noch nicht entgültig.</p>
            <SearchList />
        </div>
        <p style="position: relative; text-align: center; color: gray">Powered by Github Pages<br>© 2023 Die Coolen Allgemeinen Ficker</p>
    </div>
</template>

<style scoped>
</style>