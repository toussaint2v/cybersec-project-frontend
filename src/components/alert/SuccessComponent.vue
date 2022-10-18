<template>
  <div class="popup duration-200 flex m-auto m-1 font-medium py-1 px-2 bg-white rounded-md text-green-700 bg-green-100 border border-green-300 z-[2000]">
    <div class="m-auto">
      <i class="fa-solid fa-check fa-xl "></i>
    </div>
    <div class="text-lg font-normal mx-2">
      {{ message }}
    </div>
    <div class="m-auto">
      <button @click="closePopUp">
        <i class="fa-solid fa-close fa-xl "></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuccessComponent",
  props: ['message'],
  mounted() {
    document.querySelector('.popup').style.opacity = '1'
  },
  methods:{
    closePopUp() {
      document.querySelector('.popup').style.opacity = '0'
    }
  }
}
</script>

<style scoped>

</style>