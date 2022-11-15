<template>
  <div class="popup duration-200 flex m-auto m-1 font-medium py-2 px-4 bg-white rounded-2xl text-blue-700 bg-blue-50 border border-blue-300 z-[2000]">
    <div class="m-auto mr-2">
      <i class="fa-solid fa-check fa-xl "></i>
    </div>
    <div class="text-lg font-normal mx-2">
      {{ message }}
    </div>
    <div class="m-auto ml-2">
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