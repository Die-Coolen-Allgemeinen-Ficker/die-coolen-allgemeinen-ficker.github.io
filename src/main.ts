import { createApp } from 'vue';

import './style.css';
import App from './App.vue';
import Smp from './smp/Smp.vue';
import Modlist from './smp/modlist/Modlist.vue';
import MyAccount from './my-account/MyAccount.vue';
import Profile from './profile/Profile.vue';
import ProfileList from './profile/list/ProfileList.vue';

createApp(App).mount('#app');
createApp(Smp).mount('#smp');
createApp(Modlist).mount('#modlist');
createApp(MyAccount).mount('#my-account');
createApp(Profile).mount('#profile');
createApp(ProfileList).mount('#profileList');