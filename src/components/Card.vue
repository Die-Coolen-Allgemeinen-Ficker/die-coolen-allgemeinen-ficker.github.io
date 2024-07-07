<script setup lang="ts">
defineProps<{
    title: string,
    content: string,
    href?: string,
    thumbnail?: string,
    banner?: string
}>();
</script>

<template>
    <a v-bind:href="href" style="position: relative; display: block; width: 50%; left: -25%; margin-bottom: 5em;">
        <div class="card">
            <img v-bind:src="banner || ''" style="object-fit: cover; height: 8em; width: calc(100% + 4em); margin-left: -2em; margin-top: -2em; border-top-left-radius: 2em; border-top-right-radius: 2em;">
            <img v-bind:src="thumbnail" style="position: absolute; width: 5em; top: 2em; right: 2em">
            <h1>{{ title }}</h1>
            <p>{{ content }}</p>
        </div>
    </a>
</template>

<style scoped>
.card {
    text-align: left;
    background-color: #1a1a1a;
    border-radius: 2em;
    object-fit: contain;
    white-space: pre-wrap;

    transition: all 0.2s ease-in-out;
}
.card:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 2em #aa88ff55);
}

.banner {
    border-radius: 2em;
    background-size: cover;
    height: 4em;
    width: 100%;
}

p {
    font-size: 1.5em;
    font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

a {
    color: white;
}
a:link {
    color: white;
}
a:visited {
    color: white;
}
a:hover {
    color: white;
}
a:active {
    color: white;
}

img[src=""] {
    display: none;
}
</style>