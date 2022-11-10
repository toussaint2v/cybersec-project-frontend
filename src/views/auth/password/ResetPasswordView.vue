<template>
<div>
  <div class="pt-16 px-2 flex justify-center">
    <form @submit.prevent="resetPassword" class="card-simple w-full sm:w-1/2 md:w-2/5 lg:w-[400px]">
      <h1 class="bold text-center text-2xl">Réinitialiser mon mot de passe</h1>
      <div class="border w-3/4 mx-auto my-4 border-fuchsia-800"></div>
      <ErrorComponent v-if="state.error" :error="state.error"/>

      <div class="mb-6">
        <label class="block text-sm font-bold mb-2" for="password">
          Mot de Passe
        </label>
        <input v-model="form.password" class="input-card" id="password" type="password"
               placeholder="**************">
      </div>
      <div class="">
        <ButtonLoading class="mx-auto" :loading="state.loading" value="Envoyer"/>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import ErrorComponent from "@/components/alert/ErrorComponent";
import axios from "@/api/axios";
import ButtonLoading from "@/components/form/ButtonLoading";
import router from "@/router";
export default {
  name: "ResetPasswordView",
  components: {ButtonLoading, ErrorComponent},
  data() {
    return {
      form: {
        email: '',
        password_token: '',
        password: ''
      },
      state: {
        error: null,
        success: false,
        loading: false
      },
    }
  },
  methods: {
    async resetPassword() {
      this.state.loading = true;
      this.form.email = this.$route.query.email
      this.form.password_token = this.$route.query.password_token
      await axios.post('api/reset-password/store', this.form).then((res) => {
        if (res.data === 'OK'){
          router.push('/login');
        }
      }).catch((err) => {
        this.state.error = err.response.data
      }).finally(() => {
        this.state.loading = false;
      });
    }
  }
}
</script>

<style scoped>

</style>