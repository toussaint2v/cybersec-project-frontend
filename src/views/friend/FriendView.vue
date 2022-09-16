<template>
<div>

</div>
</template>

<script>
import axios from "@/api/axios";

export default {
  name: "FriendView",
  mounted() {
    this.getAllfriends();
  },
  methods: {
    async getAllfriends() {
      this.state.loading = true;
      await axios.get('api/friends').then((res) => {
        this.$store.commit('authenticateUser', res.data);
      }).catch((err) => {
        this.state.error = err.response.data['message']
      }).finally(() => {
        this.state.loading = false;
      });
    }
  }
}
</script>

<style scoped>

</style>