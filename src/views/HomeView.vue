<template>
  <div class="home">
    <h1 class="pt-20 text-2xl text-center ">Bonjour {{ user.first_name }}</h1>
    <div class="mt-80">f</div>
    <div class="mt-80">f</div>

    <div class="mt-80">r</div>
    <div class="mt-80">f</div>
    <div class="mt-80">f</div>

    <div class="mt-80">r</div>
    <div class="mt-80">f</div>
    <div class="mt-80">f</div>

    <div class="mt-80">r</div>


  </div>
</template>

<script>
// @ is an alias to /src

import store from "@/store";

export default {
  name: 'HomeView',
  methods:{

  },
  computed: {
    user() {
      return store.getters.user;
    },
  }
}
</script>
