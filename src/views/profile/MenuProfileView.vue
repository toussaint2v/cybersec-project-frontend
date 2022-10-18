<template>
  <div class="grid content-center" style="height: 80vh">
    <div class="grid grid-cols-2 content-center w-80 mx-auto text-center">
      <router-link to="/profile/edit" class="item">
        <div>Profil</div>
        <i class="fa-solid fa-user fa-2xl mt-3"></i>
      </router-link>
      <router-link to="/friends" class="item">
        <div class="absolute right-4 top-4">
          <span v-if="invitationNotif" class="flex h-5 w-5 relative ml-auto">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-5 w-5 bg-purple-500 text-center justify-center grid content-center text-white">{{ invitationNotif }}</span>
        </span>
        </div>
        <div>Amis</div>
        <i class="fa-solid fa-user-group fa-2xl mt-3"></i>
      </router-link>
      <div class="item">
        <div>Messages</div>
        <i class="fa-solid fa-comments fa-2xl mt-3"></i>
      </div>
      <div class="item">
        Theme
        <SwitchCheckbox class="pl-6 mt-2" @change="toggleTheme" />
        <div class="border border-gray-600 rounded-xl p-1 mt-2"> {{ theme }} </div>
      </div>

      <div class=" col-span-2">
        <button class="bt-danger w-full mt-5" @click="logout" >Déconnexion</button>
      </div>

    </div>

  </div>
</template>

<script>

import SwitchCheckbox from "@/components/SwitchCheckbox";
import store from "@/store";
import axios from "@/api/axios";
export default {
  name: "menuProfileView",
  components: {SwitchCheckbox},
  data(){
    return{
      theme: "",
      invitationNotif: null
    }
  },
  mounted() {
    this.getTheme();
    this.getInvitationNotif();
  },
  methods:{
    logout(){
      this.$store.dispatch('logout');
    },
    toggleTheme(){
      this.$store.dispatch('toggleTheme');
      this.getTheme();
    },
    getTheme(){
      if (store.getters.getUserTheme === "light-theme")
        this.theme = "Claire"
      else
        this.theme = "Sombre"
    },
    async getInvitationNotif(){
      await axios.get('api/invitation/count', {params: {profileId: store.getters.user.id}})
          .then((res) => {
            this.invitationNotif = res.data.notif;
          })
    }
  }
}
</script>

<style scoped>
.item{
  @apply h-36 w-36  rounded-2xl m-2 p-5 shadow shadow-fuchsia-500 font-bold relative;
  background: var(--background-color-secondary);
}

</style>