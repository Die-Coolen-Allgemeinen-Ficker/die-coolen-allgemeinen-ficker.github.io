<script setup lang="ts">
</script>

<template>
    <div class="navbar">
        <a href="/"><img src="/assets/images/bcaf.png"></a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src="/assets/images/discord.svg"></a>
        <a href="/smp/"><img src="/assets/images/minecraft.png"></a>
        <a href="https://github.com/Die-Coolen-Allgemeinen-Ficker"><img src="/assets/images/github.png"></a>
    </div>
</template>

<style scoped>
.navbar {
    background-color: #1a1a1a;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
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
</style>