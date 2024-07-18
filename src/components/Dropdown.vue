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
        <ul id="dropdown" class="dropdownContent" v-bind:style="{ backgroundColor: `${color}55` }"></ul>
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
            const li = document.createElement('li');
            li.appendChild(entry);
            content.appendChild(li);
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
    width: 100%;
    border-radius: 1em;
}

.dropdownContent {
    display: none;
    position: absolute;
    z-index: 1;
    flex-wrap: wrap;
    list-style-type: none;
    border-radius: 2.5em;
}
.dropdownContent li {
    flex: 1 0 33.3%;
}

.show {
    display: flex;
}
</style>