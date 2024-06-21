<script setup lang="ts">
import LoadingScreen from './components/LoadingScreen.vue';
import BcafLogo from './components/BcafLogo.vue';
import TitleMessage from './components/TitleMessage.vue';
import Card from './components/Card.vue';

const wallpaper = `/assets/images/wallpapers/${Math.floor(Math.random() * 10)}.png`;

function removeLoadingScreen () {
    document.getElementById('loadingScreen')?.classList.add('hidden');
    setTimeout(() => {document.getElementById('loadingScreen')?.remove();}, 500);
}

</script>

<template>
  <LoadingScreen />
  <div class="wallpaper">
    <img v-bind:src="wallpaper" @load="removeLoadingScreen">
    <div class="title">
      <BcafLogo />
      <h1 style="filter: drop-shadow(0 0 0.1em #000000ff);">🅱 Coolen Allgemeinen Ficker</h1>
      <TitleMessage />
    </div>
    <div style="background-image: linear-gradient(to bottom, #24242400, #242424ff); position: absolute; bottom: 0; height: 20%; width: 100%"></div>
  </div>

  <div style="position: absolute; top: 110%; width: 100%">
    <h1 style="position: relative; left: -50%">Mehr Shit coming <i>soon™</i></h1>
    <Card title="BCAF Account [Public Beta]" content="Melde dich mit deinem BCAF Account an." href="my-account/"></Card>
    <Card title="BCAF Account Suche [Public Beta]" content="Schau dir deine BCAF Statistiken oder die von anderen an." href="profile/list/"></Card>
    <Card title="Discord Server" content="Der Ort der Die Coolen Allgemeinen Ficker zusammenbringt." href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" thumbnail="/assets/images/discord.svg" />
    <Card title="Minecraft SMP" content="🅱CAF hat einen eigenen Minecraft SMP auf dem sowohl Vanilla als auch Modpack Welten gespielt werden." href="smp/" thumbnail="/assets/images/minecraft.png" />
    <Card title="🅱CAF auf Github" content="🅱CAF hat nun eine Github Organization wo diese Website sowie zukünftige Projekte von 🅱CAF zu finden sind." href="https://github.com/Die-Coolen-Allgemeinen-Ficker" thumbnail="/assets/images/github.png" />
    <p style="position: relative; left: -50%; color: gray">Powered by Github Pages<br>© 2024 Die Coolen Allgemeinen Ficker</p>
  </div>
</template>

<style scoped>

.wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%
}

.title {
  position: absolute;
  width: 100%;
  top: 0;
}

</style>
