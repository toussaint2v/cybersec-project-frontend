<template>
  <div class="container m-auto p-3">
    <h1 class="bold text-center text-2xl">Modifier Mon Compte</h1>
    <div class="border w-3/4 mx-auto my-4 border-fuchsia-800"></div>
    <div class="w-10/12 mx-auto">
       <ErrorComponent v-if="state.error" :error="state.error"/>

      <div class="grid grid-cols-2 md:w-2/3 mb-4">
        <div class="mr-2">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="name">
            Nom
          </label>
          <input v-model="form.name" class="input-simple" id="name" type="text" >
        </div>
        <div class="ml-2">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="firstName">
            Prénom
          </label>
          <input v-model="form.first_name" class="input-simple" id="firstName" type="text" >
        </div>
      </div>

      <div class="md:w-1/2">
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            Nom d'utilisateur
          </label>
          <input v-model="form.username" class="input-simple" id="username" type="text" >
        </div>

        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="date">
            Date de Naissance
          </label>
          <input v-model="form.birthDate" class="input-simple" id="date" type="date" >
        </div>

        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="age">
            Age
          </label>
          <input v-model="form.age" class="input-simple" id="age" type="number" >
        </div>

        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="address">
            Adresse
          </label>
          <input v-model="form.address" class="input-simple mb-3" id="address" type="text" >
        </div>


      </div>
    <div class="">
      <ButtonLoading class="ml-auto" :loading="state.loading" @click="updateProfile" value="Modifier" />
    </div>
    </div>
   


    


  </div>

</template>

<script>
import ErrorComponent from "@/components/ErrorComponent";
import ButtonLoading from "@/components/form/ButtonLoading.vue"

import axios from "@/api/axios";
export default {
  name: "EditProfileView",
  components: {ErrorComponent, ButtonLoading},
  data() {
    return {
      form: {
        name: null,
        first_name: null,
        username: null,
        birthDate: null,
        age: null,
        address: null
      },
      response: '',
      state:{
        error: null,
        success: false,
        loading: true
      },
    }
  },
  mounted() {
    this.editProfile();
  },
  methods:{

    editProfile(){
      axios.get('api/profile/edit').then((res) =>{
        this.form = res.data
      }).catch((error) => {
        this.state.error = error.response.data;
      }).finally(() => {
        this.state.loading =  false;
      });
    },

    updateProfile(){
      this.state.loading = true;
      axios.post('api/profile/update', this.form).then(() =>{
        this.editProfile();
      }).finally(() => {
        this.state.loading =  false;
      });
    },
    toggleTheme(){
      this.$store.dispatch('toggleTheme');
    }
  }

}
</script>

<style scoped>

</style>