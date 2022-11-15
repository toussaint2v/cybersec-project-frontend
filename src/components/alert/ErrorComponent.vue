<template>
  <div v-if="error" class="popup flex m-auto m-1 font-medium py-2 px-4 bg-white rounded-2xl text-red-700 bg-red-50 border border-red-300 ">
    <div class="m-auto mr-2">
      <i class="fa-solid fa-info-circle fa-xl "></i>
    </div>
    <div class="text-lg font-normal mx-2">
      {{ error }}
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
  name: 'ErrorComponent',
  props: ['error'],
  mounted() {
    document.querySelector('.popup').style.display = 'flex'
  },
  methods:{
    closePopUp() {
      document.querySelector('.popup').style.display = 'none'
    }
  }
}

</script>