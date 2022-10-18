<template>
<div>
  <div class="md:flex justify-evenly p-8 md:space-x-2 ">
    <FriendsList />

    <FriendsRequest />
  </div>

  <SearchFriends />
</div>
</template>

<script>
import FriendsRequest from "@/components/friend/FriendsRequest";
import SearchFriends from "@/components/friend/SearchFriends";
import FriendsList from "@/components/friend/FriendsList";
import axios from "@/api/axios";
import store from "@/store";
export default {
  name: "FriendView",
  components: {FriendsList, SearchFriends, FriendsRequest},
  mounted() {
    this.openAllInvitation()
  },
  data(){
    return {


    }
  },
  computed:{


  },
  methods: {
    async openAllInvitation(){
      var formInvit = {}
      formInvit.profileId = store.getters.user.id

      await axios.post('/api/invitations/open', formInvit);
    }

  }
}
</script>

<style scoped>

</style>