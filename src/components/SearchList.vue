<script lang="ts">
import { modlist } from '../data/smp.json';

export default {
    data () {
        return {}
    },
    methods: {
        fillList (search?: string) {
            const list = document.getElementById('list');
            const regex = search ? new RegExp(search, 'gi') : null;

            list!.replaceChildren();

            for (let mod of modlist) {
                if (regex) {
                    if (!mod.match(regex))
                        continue;
                }

                const element = document.createElement('li');
                element.innerHTML = mod;
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
    <input @input="updateSearch" id="search" placeholder="Suche nach Mods">
    <p id="results">Ergebnisse: </p>
    <ul id="list"></ul>
</template>

<style scoped>
ul {
    list-style-type: none;
}

input {
    color: #aa88ff;
    font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 1.5em;
    width: 75%;
    background-color: #222222;
    border: 0;
    border-radius: 0.5em;
}

::placeholder {
    color: gray;
}
</style>