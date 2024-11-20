<template>
  <div class="container mt-5">
  <h2 class="text-center mb-4 fw-bolder" id="title">Explore Game Modes</h2>
  <div class="row text-white">
    <div class="col-md-4 col-12 text-center mb-3" id="photo">
      <img src="../assets/modes/Hybrud-Samurai.png" class="img-fluid rounded" alt="Zombie Mode">
      <h4 id="title" class="mt-3 fw-bolder">Hybrid vs Samurai</h4>
      <p class="text-start">In this intense and unique mode, players are divided into two teams: Samurai warriors and Hybrid zombies. The Samurai wield dual swords, showcasing their unparalleled combat skills in melee battles, while the Hybrids rely on their mutated abilities to overpower their foes. The last team standing wins the round, making every move and strike crucial. Engage in epic battles where strategy, teamwork, and agility decide the ultimate victor!</p>
    </div>
    <div class="col-md-4 col-12 text-center mb-3" id="photo">
      <img src="../assets/modes/Armageddon.png" class="img-fluid rounded" alt="Deathmatch">
      <h4 id="title" class="mt-3 fw-bolder">Armageddon Mode</h4>
      <p class="text-start">Prepare for a showdown of epic proportions in Armageddon Mode! Players are split into two opposing forces: Survivors and Nemesis Zombies. Survivors are equipped with a powerful arsenal, including the AK-47, M4A1, and XM1014, giving them the firepower to fend off the relentless Nemesis Zombies. On the other side, the Nemesis Zombies rely on brute strength and resilience to eliminate the Survivors. The round's outcome hinges on strategy and survival, as the last team standing emerges victorious in this high-stakes battle</p>
    </div>
    <div class="col-md-4 col-12 text-center mb-3" id="photo">
      <img src="../assets/modes/Plague-Mode.png" class="img-fluid rounded" alt="Classic Mode">
      <h4 id="title" class="mt-3 fw-bolder">Plague Mode</h4>
      <p class="text-start">Plague Mode immerses players in a chaotic battlefield where Survivors, Nemesis Zombies, Normal Zombies, and regular players without special abilities all compete for dominance. Humans and Zombies are pitted against each other in a no-holds-barred struggle for survival. With diverse roles and unpredictable combat dynamics, this mode tests your skills, strategy, and adaptability. Will you emerge as the last player standing in this ultimate test of chaos and survival?</p>
    </div>
    <div class="col-md-4 col-12 text-center mb-3" id="photo">
      <img src="../assets/modes/Cannibal.png" class="img-fluid rounded" alt="Classic Mode">
      <h4 id="title" class="mt-3 fw-bolder">Cannibal Mode</h4>
      <p class="text-start">In Cannibal Mode, there’s no humanity left—everyone has turned into a ravenous zombie! It’s a brutal free-for-all as the undead battle each other for survival. Only the strongest and most cunning zombie can claim victory. Tear through your opponents, devour the competition, and fight to be the last zombie standing in this thrilling and savage mode!</p>
    </div>
    <div class="col-md-4 col-12 text-center mb-3" id="photo">
      <img src="../assets/modes/Tag.png" class="img-fluid rounded" alt="Classic Mode">
      <h4 id="title" class="mt-3 fw-bolder">Tag Mode</h4>
      <p class="text-start">Tag Mode offers a thrilling game of cat and mouse with a twist! Players are divided into two teams: Humans and Zombies. Zombies must chase and infect Humans, but with every infection, roles are reversed—the infected Human becomes a Zombie, and the Zombie turns into a Human. The action unfolds in timed cycles: when the timer ends, all Zombies perish, and a new round begins. The game continues until only one Human remains and all Zombies are eliminated. Can you survive the relentless chase and outlast the infection?</p>
    </div>
    <div class="col-md-4 col-12 text-center mb-3" id="photo">
      <img src="../assets/modes/Swarm.png" class="img-fluid rounded" alt="Classic Mode">
      <h4 id="title" class="mt-3 fw-bolder">Swarm Mode</h4>
      <p class="text-start">Swarm Mode pits Humans and Zombies against each other in an all-out battle for survival. In this mode, players are divided into two distinct teams: normal Humans and normal Zombies. With no special powers or abilities, it’s a pure test of teamwork and skill as both sides fight to eliminate the other. The clash between the living and the undead reaches its peak in this straightforward yet action-packed mode. Will the Humans survive the swarm, or will the Zombies prevail?</p>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
#photo img {
  transition: transform 0.3s ease; /* Smooth transition for the zoom effect */
}

#title {
  color: #ff8000;
}

#photo img:hover {
  transform: scale(1.1); /* Slight zoom on hover (10% increase in size) */
}
</style>