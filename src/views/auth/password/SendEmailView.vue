<template>
<div>
  <div class="pt-16 px-2 flex justify-center">
    <form @submit.prevent="sendEmail" class="card-simple w-full sm:w-1/2 md:w-2/5 lg:w-[400px]">
    <h1 class="bold text-center text-2xl">Réinitialiser mon mot de passe</h1>
    <div class="border w-3/4 mx-auto my-4 border-fuchsia-800"></div>
    <ErrorComponent v-if="state.error" :error="state.error"/>

    <div class="mb-4">
      <label class="block text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input v-model="form.email" class="input-card" id="email" type="email">
    </div>

    <div class="">
      <ButtonLoading class="mx-auto" :loading="state.loading" value="Envoyer"/>
    </div>
  </form>
  </div>
</div>
</template>

<script>
import axios from "@/api/axios";
import ButtonLoading from "@/components/form/ButtonLoading";
import ErrorComponent from "@/components/alert/ErrorComponent";

export default {
  name: "SendEmailView",
  components: {ErrorComponent, ButtonLoading},
  data() {
    return {
      form: {
        email: ''
      },
      state: {
        error: null,
        success: false,
        loading: false
      },
    }
  },
  methods: {
    async sendEmail() {
      this.state.loading = true;
      await axios.post('api/reset-password/sendEmail', this.form).then((res) => {
        console.log(res.data)
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