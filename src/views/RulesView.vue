<template>
    <div class="container rules-container">
      <br>
      <h1 class="text-center text-warning mb-4 fw-bold">ZM Server Rules</h1>
      
      <div class="card bg-dark text-white p-4">
        <h3 class="text-warning">📜 Golden Rules</h3>
        <ul class="list-group list-group-flush bg-dark">
          <li class="list-group-item bg-dark text-white">1️⃣ Respect others to receive respect in return.</li>
          <li class="list-group-item bg-dark text-white">2️⃣ Adhere strictly to the first rule.</li>
          <li class="list-group-item bg-dark text-white">3️⃣ The primary objective is to have fun.</li>
        </ul>
      </div>
  
      <!-- Specific Infractions -->
      <div class="card bg-dark text-white p-4 mt-4">
        <h3 class="text-warning">🚨 Infractions & Punishments</h3>
  
        <h4 class="text-danger mt-3">Gag (Mute) 🛑</h4>
        <ul>
          <li>🔇 Players using offensive language or aggressive behavior.</li>
          <li>🔇 Begging for ammunition repeatedly.</li>
          <li>⏳ Initial gag is 3 minutes, increases with repeated offenses.</li>
        </ul>
  
        <h4 class="text-danger mt-3">Slay (In-Game Kill) ❌</h4>
        <ul>
          <li>⚠️ Destroying another player's lasermine.</li>
          <li>⚠️ Zombies hiding or refusing to attack (except Samurai mode).</li>
          <li>⚠️ Using jetpacks in survivor/nemesis/samurai modes.</li>
          <li>⚠️ Deploying lasermines as a survivor.</li>
          <li>⚠️ Buying multiple mods in the same map (one mod per map allowed).</li>
        </ul>
  
        <h4 class="text-danger mt-3">Ban (Permanent or Temporary) 🚫</h4>
        <ul>
          <li>💀 Using hacks results in a permanent ban with proof (demo required).</li>
          <li>💀 Offensive language after 3 gags = ban (5-30 mins).</li>
          <li>💀 Insulting players/admins (family, religion, race) can lead to long-term bans.</li>
          <li>💀 Reconnecting or switching to spectator when chosen as first zombie.</li>
        </ul>
  
        <h4 class="text-warning mt-3">Slap (In-Game Nudge) ✋</h4>
        <ul>
          <li>👊 Players stuck in map corners or glitches may be slapped.</li>
          <li>👊 Zombies refusing to attack get slaps, then freeze, then slay.</li>
        </ul>
      </div>
  
      <!-- Game Mode Rules -->
      <div class="card bg-dark text-white p-4 mt-4">
        <h3 class="text-warning">🎮 Game Mode Rules</h3>
  
        <h4 class="text-primary mt-3">🔭 Sniper</h4>
        <ul>
          <li>🚀 Jetpack usage is forbidden.</li>
          <li>🤫 Snipers must hide.</li>
        </ul>
  
        <h4 class="text-primary mt-3">🔫 Survivor</h4>
        <ul>
          <li>🚀 Jetpack usage is forbidden.</li>
          <li>⚔️ Lasermine deployment is allowed.</li>
          <li>🤫 Survivors must hide.</li>
        </ul>
  
        <h4 class="text-primary mt-3">💀 Nemesis</h4>
        <ul>
          <li>🔓 Free nemesis is allowed only if granted to all players.</li>
          <li>⏳ Hiding to prolong the round is not allowed.</li>
        </ul>
  
        <h4 class="text-primary mt-3">⚔️ Assassin</h4>
        <ul>
          <li>🔪 Must attack all players, not selectively avoid some.</li>
          <li>⏳ No hiding to extend the round.</li>
        </ul>
      </div>
  
      <!-- Secret Word -->
      <div class="card bg-dark text-white p-4 mt-4">
        <h3 class="text-success">🔑 Secret Word</h3>
        <p class="text-white">
          When asked "Did you read the rules?" the correct answer is: <span class="fw-bold text-warning">VIP</span>.
        </p>
      </div>
      <br>
      <br>
  
    </div>
  </template>
  
  <script>
  export default {
    name: "Rules",
    metaInfo() {
      return {
        title: 'ZM Server Rules | zm-westcstrike.com',
        meta: [
          {
            name: 'description',
            content: 'Read the full ZM server rules including punishments, golden rules, and game mode guidelines. Stay informed and avoid penalties.'
          }
        ],
        link: [
          {
            rel: 'canonical',
            href: 'https://zm-westcstrike.com/forum/rules'
          }
        ]
      };
    },
  };
  </script>
  
  <style scoped>
  .rules-container {
    max-width: 900px;
    margin: auto;
  }
  .list-group-item {
    border: none;
  }
  .card {
    border-radius: 8px;
    border: 1px solid white;
  }
  </style>
  