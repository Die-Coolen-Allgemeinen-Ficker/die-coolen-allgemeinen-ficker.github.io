<script setup lang="ts">
import { messages } from '../data/titleMessages.json';

const selectedMessage: string = messages[Math.floor(Math.random() * messages.length)];
const message = `> ${selectedMessage}`;

</script>

<template>
    <h1 id="titleMessage"><p class="type">{{ message }}</p></h1>
</template>

<style scoped>

#titleMessage {
    font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    width: 50%;
    margin-left: 25%;
    background-color: #444444aa;
    color: #aa88ff;
    padding: 1%;
    border-radius: 0.25em;
    font-style: italic;
}
</style>