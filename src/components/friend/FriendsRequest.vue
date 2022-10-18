<template>
  <div class="card-simple w-1/2 ">
    <h1 class="font-bold">Mes demandes</h1>
    <div v-if="invitationsList.length">
      <div v-for="invitation in invitationsList" :key="invitation">
        {{ invitation.username }}
        <button class="bt-danger" @click="deleteInvitation(invitation.from, invitation.to)">Refuser</button>
        <button class="bt-simple bg-green-600">Accepter</button>
      </div>
    </div>
    <p class="text-neutral-500" v-else>
      Vous n'avez auncune demandes
    </p>
  </div>
</template>

<script>
import axios from "@/api/axios";

export default {
  name: "FriendsRequest",
  data() {
    return {
      invitationsList: []
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
    async deleteInvitation(from, to){
      await axios.delete('/api/invitation/destroy', { params: {
          from: from,
          to: to
        }
      }).then((res) => {
        console.log(res)
        this.getInvitaion();
      })
    },
  }
}
</script>

<style scoped>

</style>