<script setup lang="ts">
defineProps<{
    name: string,
    color: string,
    content: HTMLElement[]
}>();
</script>

<template>
    <div class="dropdown" v-bind:style="{ backgroundColor: color }">
        <button v-on:click="dropdownClick" class="dropdownButton" v-bind:style="{ backgroundColor: color }">{{ name }}</button>
        <div id="dropdown" class="dropdownContent"></div>
    </div>
</template>

<script lang="ts">

export default {
    mounted () {
        window.onclick = event => {
            if (!(event.target as HTMLButtonElement).matches('.dropdownButton')) {
                const dropdowns = document.getElementsByClassName('dropdownContent');
                [...dropdowns].forEach(dropdown => {
                    if (dropdown.classList.contains('show'))
                        dropdown.classList.remove('show');
                });
            }
        }

        const content = document.getElementById('dropdown')!;

        this.content.forEach(entry => {
            content.appendChild(entry);
        });
    },

    methods: {
        dropdownClick () {
            document.getElementById('dropdown')?.classList.toggle('show');
        }
    }
}
</script>

<style scoped>
.dropdownButton {
    cursor: pointer;
    size: 3em;
}

.dropdown {
    position: relative;
    display: inline-block;
    font-size: 1em;
    width: 80%;
    border: solid;
    border-radius: 1em;
}

.dropdownContent {
    display: none;
    position: absolute;
    min-width: 80%;
    overflow: auto;
    z-index: 1;
    max-width: 1em;
    border-radius: 1em;
    border: solid;
}

.show {
    display: inherit;
}
</style>