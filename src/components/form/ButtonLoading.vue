<template >
    <button class="bt-simple bg-blue-600 hover:bg-blue-900 text-white w-32 flex justify-center h-10" type="submit">
        <div v-if="loading"><img src="../../assets/loading.gif" width="20" alt="loading"></div>
        <div v-else>{{ value }} </div>
    </button>
</template>

<script>
export default {
    props:['loading', 'value']
}
</script>