<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import Download from '../components/Download.vue';
</script>

<template>
    <Navbar />
    <div style="position: absolute; width: 100%; top: 20%;">
        <div class="container">
            <h1>🅱CAF SMP</h1>
            <p>
            Der beste Discord Server aller Zeiten hat auch seinen eigenen Minecraft Server, hier ist solange man kein Hurensohn ist alles erlaubt. Die Anzahl der Slots ist unbegrenzt, also sind alle Gäste willkommen.
            </p>
        </div>
        <img src="/assets/images/modpack.png" style="margin-top: 5em; display: block; margin-left: auto; margin-right: auto;">
        <div class="container" style="margin-top: 1em;">
            <h1>Info</h1>
            <p>
            Start: 08.12.2023 um 18:00 Uhr<br>
            Version: Custom Forge 1.12.2 Modpack<br>
            Mindestanforderung zugewiesener Arbeitsspeicher: 8GB<br>
            Modliste: <a href="/smp/modlist/">Liste sehen / durchsuchen</a>
            </p>
            <Download href="/assets/sexpack-1.0.1.zip" name="sexpack-1.0.1.zip" />
            <br><br>
            <h2>Download Anweisungen</h2>
            <p>
            1. Downloade sexpack-1.0.0.zip und <a href="https://www.curseforge.com/download/app">Curseforge</a><br>
            2. Geh in den Curseforge Settings unter <i>Game Specific -> Minecraft -> Java Settings</i> zu <i>Allocated Memory</i> und stelle mindestens 8000MB ein<br>
            3. Setze die folgenden JVM-Arguments für bessere Performance in <i>Additional Arguments</i> ein: <span style="color: #aa88ff; background-color: #141414;">-XX:+UseG1GC -Dsun.rmi.dgc.server.gcInterval=2147483646 -XX:+UnlockExperimentalVMOptions -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M</span>
            4. Geh im normalen Curseforge unter <i>Minecraft -> My Modpacks -> + Create Custom Profile</i> auf <i><u>import</u></i> und wähle die sexpack-1.0.0.zip Datei aus<br>
            5. ???<br>
            6. Profit
            </p>
        </div>
        <p style="position: relative; text-align: center; color: gray">Powered by Github Pages<br>© 2023 Die Coolen Allgemeinen Ficker</p>
    </div>
</template>

<script scoped>
</script>