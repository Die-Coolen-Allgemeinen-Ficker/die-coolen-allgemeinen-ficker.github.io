<script setup lang="ts">
function removeVideo () {
    document.getElementById('intro')?.remove();
    const logo = document.createElement('img');
    logo.src = '/assets/images/bcaf.png';
    logo.className = 'logo';
    logo.setAttribute('style', 'width: 20%; height: 20%');
    document.getElementsByClassName('logo')[0].appendChild(logo);
}
</script>

<script lang="ts">
export default {
    mounted () {
        (document.getElementById('intro') as HTMLMediaElement).play();
    }
}
</script>

<template>
    <div class="logo">
        <video src="/assets/bcaf_intro.mp4" muted id="intro" style="border-radius: 50%; object-fit: cover; height: 20%; width: 20%" @ended="removeVideo"></video>
    </div>
</template>

<style scoped>
.logo {
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
img:hover.logo {
  filter: drop-shadow(0 0 2em #ff0000ff);
}
</style>