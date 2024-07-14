<script setup lang="ts">
defineProps<{
    entries: HTMLAnchorElement[]
}>();
</script>

<script lang="ts">

export default {
    methods: {
        fillList (search?: string) {
            const list = document.getElementById('list');
            const regex = search ? new RegExp(search, 'gi') : null;

            list!.replaceChildren();

            for (const entry of this.entries) {
                const element = document.createElement('li');
                element.appendChild(entry);

                if (regex) {
                    if (!element.innerText.match(regex))
                        continue;
                }

                list!.appendChild(element);
            }

            document.getElementById('results')!.innerText = `Ergebnisse: ${list!.children.length}`
        },
        updateSearch () {
            const searchQuery = (document.getElementById('search') as HTMLInputElement).value;
            this.fillList(searchQuery);
        }
    },
    mounted () {
        this.fillList();
    }
}
</script>

<template>
    <input @input="updateSearch" id="search" placeholder="Suche">
    <p id="results">Ergebnisse: </p>
    <ul id="list"></ul>
</template>

<style>
.list {
    list-style-type: none;
}

::placeholder {
    color: gray;
}
</style>