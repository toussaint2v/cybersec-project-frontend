<template>
<div>
  <div class="flex justify-evenly m-8 space-x-2">
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
export default {
  name: "FriendView",
  components: {FriendsList, SearchFriends, FriendsRequest},
  mounted() {
    //this.getAllProfile();
  },
  data(){
    return {


    }
  },
  computed:{


  },
  methods: {



  }
}
</script>

<style scoped>

</style>