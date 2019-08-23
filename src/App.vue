/**
* src/App.vue
* Vue component to act as root to the main UI Component
**/

<template>
    <div id="app">
        <MainUI msg="TuneIn"/>
    </div>
</template>

<script>
    import MainUI from './components/MainUI.vue'

    export default {
        name: 'app',
        components: {
            MainUI
        },
        calculated: {},
        /**
         * created event is fired when the component is instantiated, but before it is linked to the DOM.
         * Dispatches the request action for the station list
         */
        created() {
            this.$store.dispatch('stations/getAll')
        }
    }
</script>

<style>
    /* An aid to layout visualization, outlines do not change hte final size of the object like borders will */
    /*
    * {
        outline: thin solid red;
    }
*/
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
