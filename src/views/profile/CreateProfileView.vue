<template>
    <div class="pt-6 px-2">
      <form @submit.prevent="createProfile" class="card-simple mx-auto sm:max-w-xl">
        <h1 class="bold text-center text-2xl">Créer Mon Compte</h1>
        <div class="border w-3/4 mx-auto my-4 border-fuchsia-800"></div>
        <ErrorComponent v-if="state.error" :error="state.error"/>

        <div class="flex mb-4">
          <div class="mr-2">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="name">
              Nom
            </label>
            <input v-model="form.name" class="input-card" id="name" type="text" >
          </div>
          <div class="ml-2">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="firstName">
              Prénom
            </label>
            <input v-model="form.first_name" class="input-card" id="firstName" type="text" >
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            Nom d'utilisateur
          </label>
          <input v-model="form.username" class="input-card" id="username" type="text" >
        </div>

        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="form.email" class="input-card" id="email" type="email" >
        </div>

        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="age">
            age
          </label>
          <input v-model="form.age" class="input-card" id="age" type="number" >
        </div>

        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            Mot de Passe
          </label>
          <input v-model="form.password" class="input-card mb-3" id="password" type="password" placeholder="******************">
        </div>

        <div class="flex items-center justify-between">
          <button class="bt-simple bg-blue-500 hover:bg-blue-900 ml-auto" type="button">
            Créer
          </button>
        </div>

      </form>
    </div>

</template>
<script>
import axios from "@/api/axios";
import ErrorComponent from "@/components/ErrorComponent";
import store from "@/store";
import router from "@/router";


export default {
  components: {ErrorComponent},
  data() {
          return {
              form: {
                name:null,
                first_name: null,
                username: null,
                email: null,
                password: null,
                age: null,
              },
            response: '',
            state:{
              error: null,
              success: false,
              loading: true
            },
          }
      },
      methods: {
        async createProfile() {
          await axios.post('api/profile/store', JSON.stringify(this.form)).then((res) => {
            this.response = res
            this.state.success = true;
            store.commit('unauthenticateUser');
            router.push('/login')
          }).catch((error) => {
            this.state.error = error.response.data;
          }).finally(() => {
            this.state.loading =  false;
          });
        },

      }
  }
</script>