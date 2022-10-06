<template>
<div>
  <div class="w-5/6 relative mx-auto">
    <input type="search" class="search-input input-simple" @keyup="getAllProfile()" v-model="form.search">
    <div v-if="profiles" class="absolute bg-white text-black w-full p-4 rounded mt-2">
      <div v-for="profile in profiles" :key="profile" class="mt-2">
        <span class="flex justify-between">
            {{ profile.name }}
          <button @click="sendInvitaion()" type="button" class="bt-simple bg-gray-200 border hover:border-gray-600">
            Envoyer une invitation
          </button>
        </span>
        <hr class="mt-2">
      </div>

    </div>
  </div>
</div>
</template>

<script>
import axios from "@/api/axios";
export default {
  name: "FriendView",
  mounted() {
    //this.getAllProfile();
  },
  data(){
    return {
      state:{
        error: null,
        success: false,
        loading: true
      },
      form:{
        search: null,
      },

      profilesList: null
    }
  },
  computed:{
    profiles(){
      return this.profilesList;
    }
  },
  methods: {
    async getAllProfile() {
      this.state.loading = true;
      if (this.form.search !== ''){
        await axios.post('/api/profiles/search', this.form).then((res) => {
          if(res.data.data.length > 0){
            this.profilesList = res.data.data;
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
    async sendInvitaion(){

    }
  }
}
</script>

<style scoped>

</style>