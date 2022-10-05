<template>
  <div class="pt-16 px-2">

    <div class="card-simple mx-auto max-w-md">
      <h1 class="bold text-center text-2xl">Se Connecter</h1>
      <div class="border w-3/4 mx-auto my-4 border-fuchsia-800"></div>
      <ErrorComponent v-if="state.error" :error="state.error"/>

      <div class="mb-4">
          <label class="block text-sm font-bold mb-2"  for="email">
            Email
          </label>
          <input v-model="form.email" class="input-card" id="email" type="email" >
        </div>
        <div class="mb-6">
          <label class="block text-sm font-bold mb-2" for="password">
            Mot de Passe
          </label>
          <input required v-model="form.password" class="input-card" id="password" type="password" placeholder="**************">
        </div>
        <div class="">
          <ButtonLoading class="mx-auto" @click="login" :loading="state.loading" value="Connexion"/>
        </div>
      <div class="border my-3"></div>
      <div class="text-center">
        <router-link to="/profile/create" class="bt-simple bg-gray-100 hover:bg-gray-400 text-black " type="button">
          Créer un compte
        </router-link>
      </div>
      </div>
  </div>

</template>
<script>
    import axios from "@/api/axios";
    import router from "@/router";
    import ErrorComponent from "@/components/ErrorComponent";
    import ButtonLoading from "@/components/form/ButtonLoading";


    export default {
      components: {ErrorComponent, ButtonLoading},
      data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
              state:{
                error: null,
                success: false,
                loading: false
              },
            }
        },
        methods: {
            async login() {
              this.state.loading =  true;
              await axios.post('api/login', this.form).then((res) => {
                console.log(res)
                if (res.data.message && res.data.message === 'Connexion réussie' ){
                  this.$store.commit('authenticateUser', res.data);
                }else
                  this.state.error = "Une erreur est survenu"
              }).catch((err) => {
                this.state.error = err.response.data['message']
              }).finally(() => {
                this.state.loading =  false;
              });
              router.push('/');
            }
        }
    }
</script>