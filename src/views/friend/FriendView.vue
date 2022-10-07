<template>
<div>
  <div class="flex justify-evenly m-8 space-x-2">
    <div class="card-simple w-1/2 ">
      <h1 class="font-bold">Mes amis</h1>
    </div>

    <FriendsRequest />
  </div>

  <SearchFriends />
</div>
</template>

<script>
import FriendsRequest from "@/components/friend/FriendsRequest";
import SearchFriends from "@/components/friend/SearchFriends";
export default {
  name: "FriendView",
  components: {SearchFriends, FriendsRequest},
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