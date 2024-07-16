<script setup lang="ts">
import { AccountData, validateAccessToken } from '../account';
import LoadingScreen from '../components/LoadingScreen.vue';
import Navbar from '../components/Navbar.vue';
import { Cookie } from '../cookie';
import LineGraph from '../components/LineGraph.vue';
</script>

<script lang="ts">
export default {
    async mounted () {
        document.addEventListener('keydown', event => {
            if (event.key == 'Enter')
                this.search();
        })

        if (!(await validateAccessToken()))
            return;

        const params = window.location.search;
        const accessToken: string = Cookie.getData().accessToken;

        await new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', 'https://bcaf-api.purplemoss-6328e4b6.germanywestcentral.azurecontainerapps.io/v1/accounts/list');
            request.setRequestHeader('authorization', accessToken);
            request.onreadystatechange = () => {
                if (request.readyState != 4)
                    return;

                if (request.status !== 200) {
                    return reject(alert('Etwas ist schiefgegangen.'));
                }

                const data = (JSON.parse(request.response).response as AccountData[]).sort((a, b) => a.name.localeCompare(b.name));

                const author = document.getElementById('author')!;
                for (const account of data) {
                    const option = document.createElement('option');
                    option.innerText = account.name;
                    option.value = account.userId;
                    author.appendChild(option);
                }
                resolve(null);
            };
            request.send();
        });

        await new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', 'https://bcaf-api.purplemoss-6328e4b6.germanywestcentral.azurecontainerapps.io/v1/channels/list');
            request.setRequestHeader('authorization', accessToken);
            request.onreadystatechange = () => {
                if (request.readyState != 4)
                    return;

                if (request.status !== 200) {
                    return reject(alert('Etwas ist schiefgegangen.'));
                }

                const data = JSON.parse(request.response).response;

                const channel = document.getElementById('channel')!;
                for (const c of data) {
                    const option = document.createElement('option');
                    option.innerText = c.name;
                    option.value = c._id;
                    channel.appendChild(option);
                }
                resolve(null);
            };
            request.send();
        });

        if (params !== '') {
            const urlSearchParams = new URLSearchParams(params);

            const query = urlSearchParams.get('query')!;
            (document.getElementById('query') as HTMLInputElement).value = query;
            const dataType = urlSearchParams.get('dataType') || 'relative';
            (document.getElementById('dataType') as HTMLSelectElement).value = dataType;
            const interval = urlSearchParams.get('interval') || 'daily'; 
            (document.getElementById('interval') as HTMLSelectElement).value = interval;
            const after = urlSearchParams.get('after');
            if (after) {
                const time = new Date(parseInt(after));
                time.setMinutes(time.getMinutes() - time.getTimezoneOffset());
                (document.getElementById('after') as HTMLInputElement).value = time.toISOString().slice(0,16);
            }
            const before = urlSearchParams.get('before');
            if (before) {
                const time = new Date(parseInt(before));
                time.setMinutes(time.getMinutes() - time.getTimezoneOffset());
                (document.getElementById('before') as HTMLInputElement).value = time.toISOString().slice(0,16);
            }
            const author = urlSearchParams.get('author');
            if (author)
                (document.getElementById('author') as HTMLInputElement).value = author;
            const channel = urlSearchParams.get('channel');
            if (channel)
                (document.getElementById('channel') as HTMLInputElement).value = channel;

            const request = new XMLHttpRequest();
            request.open('GET', `https://bcaf-api.purplemoss-6328e4b6.germanywestcentral.azurecontainerapps.io/v1/ngram/search${params}`);
            request.setRequestHeader('authorization', accessToken);
            request.onreadystatechange = () => {
                if (request.readyState != 4)
                    return;

                if (request.status !== 200)
                    return alert('Etwas ist schiefgegangen.');

                const data = JSON.parse(request.response).response;
                console.log(data);
                this.graphData = data;
                this.query = urlSearchParams.get('query')!;

                (this.$refs.graph as any).updateData(data[dataType], this.query);

                document.getElementById('loadingScreen')?.classList.add('hidden');
                setTimeout(() => {document.getElementById('loadingScreen')?.remove();}, 500);
            };
            request.send();
        } else {
            document.getElementById('loadingScreen')?.classList.add('hidden');
            setTimeout(() => {document.getElementById('loadingScreen')?.remove();}, 500);
        }
    },
    methods: {
        search () {
            const query = (document.getElementById('query') as HTMLInputElement).value;
            if (query === '')
                return;
            const dataType = (document.getElementById('dataType') as HTMLSelectElement).value;
            const interval = (document.getElementById('interval') as HTMLSelectElement).value;
            const after = new Date((document.getElementById('after') as HTMLInputElement).value).getTime();
            const before = new Date((document.getElementById('before') as HTMLInputElement).value).getTime();
            const author = (document.getElementById('author') as HTMLSelectElement).value;
            const channel = (document.getElementById('channel') as HTMLSelectElement).value;

            window.location.replace(`/ngram/?query=${encodeURIComponent(query)}&dataType=${dataType}&interval=${interval}${Number.isNaN(after) ? '' : `&after=${after}`}${Number.isNaN(before) ? '' : `&before=${before}`}${author === '' ? '' : `&author=${author}`}${channel === '' ? '' : `&channel=${channel}`}`);
        },
        updateDataType () {
            const dataType = (document.getElementById('dataType') as HTMLSelectElement).value;
            (this.$refs.graph as any).updateData((this.graphData as any)[dataType], this.query);
            if (dataType == 'relative')
                window.history.pushState(null, document.title, window.location.href.replace('dataType=absolute', 'dataType=relative'))
            else
                window.history.pushState(null, document.title, window.location.href.replace('dataType=relative', 'dataType=absolute'))
        }
    },
    data () {
        return {
            graphData : {},
            query: ''
        }
    }
}
</script>

<template>
    <Navbar />
    <LoadingScreen />
    <div style="position: absolute; width: 95%; display: flex; margin-left: 2.5%; top: 20%">
        <div id="lineGraphContainer" style="width: 75%; aspect-ratio: 2 / 1;">
            <LineGraph ref="graph" />
        </div>
        <div style="width: 22.5%; margin-left: 2.5%">
            <div style="display: flex;">
                <input id="query" placeholder="Suchanfrage oder Regex">
                <button v-on:click="search">Suchen</button>
            </div><br/><br/>
            <select @change="updateDataType" id="dataType">
                <option value="relative">Relative Häufigkeit</option>
                <option value="absolute">Absolute Häufigkeit</option>
            </select><br/><br/>
            <select id="interval">
                <option value="daily">Täglich</option>
                <option value="weekly">Wöchentlich</option>
            </select><br/><br/>
            <h3>Nach <input id="after" type="datetime-local"></h3><br/><br/>
            <h3 style="margin-top: -15%;">Vor <input id="before" type="datetime-local"></h3><br/><br/>
            <h3>Autor <select id="author">
                <option value="">Alle</option>
            </select></h3><br/><br/>
            <h3 style="margin-top: -15%;">Kanal <select id="channel">
                <option value="">Alle</option>
            </select></h3><br/><br/>
        </div>
    </div>
    <!--<div style="position: absolute; width: 100%; top: 20%;">
        <p style="position: relative; text-align: center; color: gray">Powered by Github Pages<br>© 2024 Die Coolen Allgemeinen Ficker</p>
    </div>-->
</template>

<style scoped>
</style>