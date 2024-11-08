<template>
  <div>
    <div class="container my-5">
        <div class="row text-center">
            <div class="col-md-4 mb-4">
                <i class="fas fa-server fa-3x mb-3 text-warning"></i>
                <div class="text-white">
                    <h4>Server Info</h4>
                    <p>View real-time stats for our top servers and join the action!</p>
                    <router-link to="/server"><button class="btn btn-warning text-white">View Server</button></router-link>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="text-white">
                    <i class="fas fa-trophy fa-3x mb-3 text-danger"></i>
                    <h4>Events & Updates</h4>
                    <p>See the latest events & updates on our server!</p>
                    <button class="btn btn-danger">View Events</button>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="text-white">
                    <i class="fas fa-gem fa-3x mb-3 text-success"></i>
                    <h4>VIP Membership</h4>
                    <p>Unlock exclusive VIP features and level up your experience.</p>
                    <router-link to="/vip-info" ><button class="btn btn-success">Learn More</button></router-link>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>