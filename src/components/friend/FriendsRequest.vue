<template>
  <div class="card-simple w-1/2 ">
    <h1 class="font-bold">Mes demandes</h1>
    <div v-if="invitationsList">
      <div v-for="invitation in invitationsList" :key="invitation">
        {{ invitation.username }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";

export default {
  name: "FriendsRequest",
  data() {
    return {
      invitationsList: null
    }
  },
  mounted() {
    this.getInvitaion()
  },
  methods:{
    async getInvitaion(){
      await axios.get('/api/invitations').then((res) => {
        this.invitationsList = res.data
      })
    },
  }
}
</script>

<style scoped>

</style>