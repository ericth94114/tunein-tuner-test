/**
* src/components/StartingInstructions.vue
* Vue component to display the usage instructions
**/

<template lang="html">

    <section class="starting-instructions">
        <h2>Getting Started</h2>
        <b-container>
            <b-row>
                <b-col>
                    <p>Click on a station at the right to begin listening</p>
                </b-col>
            </b-row>
        </b-container>
    </section>

</template>

<script lang="js">
    import {BContainer} from 'bootstrap-vue'
    import {BRow} from 'bootstrap-vue'
    import {BCol} from 'bootstrap-vue'

    export default {
        name: 'starting-instructions',
        props: [],
        data() {
            return {}
        },
        components: {
            'b-container': BContainer,
            'b-row': BRow,
            'b-col': BCol,
        },
        mounted() {

        },
        methods: {},
        computed: {},
        watch: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .starting-instructions {

    }
</style>
