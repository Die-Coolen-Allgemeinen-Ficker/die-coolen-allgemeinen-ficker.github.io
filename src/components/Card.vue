<script setup lang="ts">
defineProps<{
    title: string,
    content: string,
    href?: string,
    thumbnail?: string
}>();
</script>

<template>
    <a v-bind:href="href" style="position: relative; display: block; width: 50%; left: -25%; margin-bottom: 5em;">
        <div class="card">
            <img v-bind:src="thumbnail" style="position: absolute; width: 5em; left: 90%; top: 1em;">
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

    transition: all 0.2s ease-in-out;
}
.card:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 2em #aa88ff55);
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
</style>