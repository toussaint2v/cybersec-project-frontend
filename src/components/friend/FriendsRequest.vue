<template>
  <div class="card-simple w-1/2 ">
    <h1 class="font-bold">Mes demandes</h1>
    <div v-if="invitationsList">
      <div v-for="invitation in invitationsList" :key="invitation">
        {{ invitation.username }}
        <button class="bt-danger" @click="deleteInvitation(invitation.from, invitation.to)">Refuser</button>
        <button class="bt-simple bg-green-600">Accepter</button>
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
    async deleteInvitation(from, to){
      var form = new FormData();
      form.append('from', from);
      form.append('to', to);
      var options = { content: form };
      console.log(options)


      await axios.post('/api/invitation/destroy', {form}).then((res) => {
        console.log(res)
        this.getInvitaion();
      })
    },
  }
}
</script>

<style scoped>

</style>