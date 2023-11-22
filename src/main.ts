import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Smp from './smp/Smp.vue';
import Modlist from './smp/modlist/Modlist.vue';

createApp(App).mount('#app');
createApp(Smp).mount('#smp');
createApp(Modlist).mount('#modlist');