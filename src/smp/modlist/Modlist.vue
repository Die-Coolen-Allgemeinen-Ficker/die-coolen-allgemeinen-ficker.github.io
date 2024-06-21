<script setup lang="ts">
import Navbar from '../../components/Navbar.vue';
import SearchList from '../../components/SearchList.vue';
</script>

<template>
    <Navbar />
    <div style="position: absolute; width: 100%; top: 20%;">
        <div class="container">
            <h1>Server Modliste</h1>
            <SearchList />
        </div>
        <p style="position: relative; text-align: center; color: gray">Powered by Github Pages<br>© 2024 Die Coolen Allgemeinen Ficker</p>
    </div>
</template>

<style scoped>
</style>