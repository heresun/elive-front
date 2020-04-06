<template>
    <div id="container">

        <router-view></router-view>

    </div>
</template>

<script>


    export default {
        name: 'App',
        components: {

        },
        data() {
            return {
                state: this.$store.state
            }
        },
        methods: {}
    }
</script>

<style scoped>
    #container {
    }


</style>
