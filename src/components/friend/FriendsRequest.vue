<template>
  <div class="card-simple md:w-1/2 ">
    <h1 class="font-bold">Mes demandes</h1>
    <div v-if="invitationsList.length">
      <div class="invitation-item " v-for="invitation in invitationsList" :key="invitation">
        <div class="grid content-center capitalize">
          {{ invitation.username }} {{ invitation.name }}
        </div>
        <div class="flex">
          <button class="bt-danger mx-2" @click="deleteInvitation(invitation.from, invitation.to)">Refuser</button>
          <button class="bt-simple bg-green-600 mx-2" @click="acceptInvitation(invitation.from, invitation.to)">Accepter</button>
        </div>
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
      }).then(() => {
        this.getInvitaion();
      })
    },
    async acceptInvitation(from, to){
      var formInvit = {}
      formInvit.from = from
      formInvit.to = to

      await axios.post('/api/invitation/accept', formInvit).then(() => {
        window.location.reload();
        this.getInvitaion();
      })
    },
  }
}
</script>

<style scoped>
.invitation-item{
  @apply flex justify-between rounded p-2;
  background: var(--background-color-primary);
}
</style>