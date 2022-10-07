<template>
  <div class="card-simple w-1/2 ">
    <h1 class="font-bold">Mes amis</h1>
    <div v-if="friendsList">
      <div v-for="invitation in friendsList" :key="invitation">
        {{ invitation.username }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";

export default {
  name: "FrindsList",
  data() {
    return {
      friendsList: null
    }
  },
  mounted() {
    this.getFriends()
  },
  methods:{
    async getFriends(){
      await axios.get('/api/friends').then((res) => {
        this.friendsList = res.data
      })
    },
  }
}
</script>

<style scoped>

</style>