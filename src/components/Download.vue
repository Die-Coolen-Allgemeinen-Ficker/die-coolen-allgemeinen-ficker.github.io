<script setup lang="ts">
defineProps<{
    href: string;
    name: string;
}>();
</script>

<template>
    <a v-bind:href="href" class="download"><img src="/assets/images/download.png">{{ name }}</a>
</template>

<style scoped>
.download {
    background-color: #747bff;
    color: white;
    font-size: 2em;
    padding: 0.5em;
    border-radius: 3em;
    object-fit: contain;
    transition: all 0.2s ease-in-out;
  }
  
  .download img {
    height: 1em;
  }
  
  .download:hover {
    color: white;
    filter: drop-shadow(0 0 2em #aa88ff55);
}
</style>