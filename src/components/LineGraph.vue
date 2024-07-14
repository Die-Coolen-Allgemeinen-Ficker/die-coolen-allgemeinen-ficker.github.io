<!--<script setup lang="ts">
/*defineProps<{
    query: string;
    data: { [timestamp: string]: number };
}>();*/
</script>-->

<script lang="ts">
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { ref } from 'vue';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default {
    name: 'LineGraph',
    components: { Line },
    data () {
        return {
            chartData: {
                labels: [''],
                datasets: [
                    {
                        data: [],
                        borderColor: '#aa88ff55',
                        backgroundColor: '#aa88ff',
                        label: ':3'
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        updateData (data: any, query: string) {
            this.chartData = {
                labels: Object.keys(data).map(timestamp => new Date(parseInt(timestamp)).toUTCString().slice(0, 16)),
                datasets: [
                    {
                        data: Object.values(data),
                        borderColor: '#aa88ff55',
                        backgroundColor: '#aa88ff',
                        label: query
                    }
                ]
            }
        }
    },
    setup () {
        const graph = ref(null);
        return { graph };
    }
}
</script>

<template>
    <Line
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
</template>