<template>
  <div class="card-simple md:w-1/2 ">
    <h1 class="font-bold">Mes amis</h1>
    <div v-if="friendsList.length">
      <div v-for="friend in friendsList" :key="friend">
        {{ friend.username }}
        <button class="bt-danger" @click="deleteInvitation(friend.from, friend.to)">Supprimer</button>
      </div>
    </div>
    <p class="text-neutral-500" v-else>
      Vous n'avez auncun amis
    </p>
  </div>
</template>

<script>
import axios from "@/api/axios";
import store from "@/store";

export default {
  name: "FriendsList",
  data() {
    return {
      friendsList: []
    }
  },
  mounted() {
    this.getFriends()
  },
  methods:{
    async getFriends(){
      await axios.get('/api/friends', { params: {idProfile: store.getters.user.id } }).then((res) => {
        this.friendsList = res.data
      })
    },
    async deleteInvitation(from, to){

      await axios.delete('/api/invitation/destroy', { params: {
        from: from,
        to: to
        }
      }).then(() => {
        this.getFriends();
      })
    },
  }
}
</script>

<style scoped>

</style>