<template>
  <div class="w-5/6 relative mx-auto">
    <div class="relative">
      <input placeholder="Rechercher un ami" type="search" class="search-input input-simple" @keyup="getAllProfile()" v-model="form.search">
      <i class="fa-solid fa-search fa-xl absolute right-3 top-2 text-neutral-500"></i>
    </div>
    <div v-if="profiles" class="absolute bg-white text-black w-full p-4 rounded mt-2">
      <div v-for="profile in profiles" :key="profile" class="mt-2">
        <span class="flex justify-between">
            {{ profile.name }}

           <div class="flex" v-if="profile.accepted === 0">
            <button class="bt-simple bg-red-200 mx-2" @click="deleteInvitation(profile.from, profile.to)">Annuler</button>
            <div class="bt-simple bg-gray-200">Invitation Envoyé</div>
          </div>
          <button v-else-if="!profile.accepted" @click="sendInvitaion(profile.id)" type="button" class="bt-simple bg-gray-200 border hover:border-gray-600">
            Envoyer une invitation
          </button>
          <div class="flex" v-else>
            <div class="bt-simple bg-gray-200">Vous êtes amis</div>
          </div>
        </span>
        <hr class="mt-2">
      </div>

    </div>
  </div>

</template>

<script>
import store from "@/store";
import axios from "@/api/axios";

export default {
  name: "SearchFriends",
  data(){
    return {
      state:{
        error: null,
        success: false,
        loading: true
      },
      form:{
        search: null,
        idProfile: store.state.user.id
      },
      profilesList: null,

    }
  },
  computed:{
    profiles(){
      return this.profilesList;
    },
  },
  methods:{
    async getAllProfile() {
      this.state.loading = true;
      if (this.form.search !== null && this.form.search !== ''){
        await axios.get('/api/profiles/search', {params: {
            search: this.form.search,
            idProfile: store.getters.user.id
        }}).then((res) => {
          if(res.data.length > 0){
            this.profilesList = res.data;
          }else{
            this.profilesList = null
          }
          this.state.success = true;
        }).catch((err) => {
          this.state.error = err.response.data['message']
        }).finally(() => {
          this.state.loading = false;
        });
      }else {
        this.profilesList = null
      }
    },
    async sendInvitaion(profileId){
      var formInvit = {}
      formInvit.from = store.state.user.id
      formInvit.to = profileId
      await axios.post('/api/invitation/send', formInvit).then(() => {
        this.getAllProfile();
      })
    },
    async deleteInvitation(from, to){
      await axios.delete('/api/invitation/destroy', { params: {
          from: from,
          to: to
        }
      }).then(() => {
        this.getAllProfile();
      })
    },
  }
}
</script>

<style scoped>

</style>