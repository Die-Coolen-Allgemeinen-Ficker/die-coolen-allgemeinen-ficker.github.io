import { createApp } from 'vue';

import './style.css';
import App from './App.vue';
import Smp from './smp/Smp.vue';
import Worlds from './smp/worlds/Worlds.vue';
import Modlist from './smp/modlist/Modlist.vue';
import MyAccount from './my-account/MyAccount.vue';
import Profile from './profile/Profile.vue';
import ProfileList from './profile/list/ProfileList.vue';
import NGram from './ngram/NGram.vue';

createApp(App).mount('#app');
createApp(Smp).mount('#smp');
createApp(Worlds).mount('#worlds');
createApp(Modlist).mount('#modlist');
createApp(MyAccount).mount('#my-account');
createApp(Profile).mount('#profile');
createApp(ProfileList).mount('#profileList');
createApp(NGram).mount('#ngram');