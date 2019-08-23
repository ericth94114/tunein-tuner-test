/**
* src/components/StationDetails.vue
* Vue component to display the Stations details
**/

<template lang="html">

    <section class="station-details">
        <h2>{{ deets.name }}</h2>
        <b-container>
            <b-row>
                <b-col>
                    <!--suppress JSUnresolvedVariable -->
                    <img :src=deets.imgUrl :alt="'Station logo ' + deets.name">
                </b-col>
                <b-col cols="8">
                    <p>{{ deets.description}}</p>
                    <p>{{ formatTags(deets.tags) }}</p>
                </b-col>
            </b-row>
        </b-container>
        <p>
            <!-- two conditionally displayed audio tags, depending upon the state of the autoPlay data -->
            <audio
                    autoplay="autoplay"
                    controls="controls"
                    ref="player"
                    v-if="autoPlay === 'autoplay'"
            >
                <!--suppress JSUnresolvedVariable -->
                <source data-v-86dfa4c4=""
                        type="audio/mpeg"
                        v-bind:src="deets.streamUrl">
            </audio>
            <audio
                    controls="controls"
                    ref="player"
                    v-else>
                <!--suppress JSUnresolvedVariable -->
                <source data-v-86dfa4c4=""
                        type="audio/mpeg"
                        v-bind:src="deets.streamUrl">
            </audio>
        </p>
    </section>

</template>

<script lang="js">
    import {BContainer} from 'bootstrap-vue'
    import {BRow} from 'bootstrap-vue'
    import {BCol} from 'bootstrap-vue'
    import {mapGetters} from 'vuex'

    /**
     * export the various parts of the component
     */
    export default {
        name: 'station-details',
        props: ['deets'],  // the names of the properties that the parent component can send
        components: { // the components used by this one
            'b-container': BContainer,
            'b-row': BRow,
            'b-col': BCol,

        },
        /**
         * mounted executes when the component is mounted to the DOM
         */
        mounted() {
            /**
             * WHen the deets prop changes load the audio in the player (was not loading consistently, on it's own)
             */
            this.$watch('deets', () => {
                this.$refs.player.load()
            })
        },
        /**
         * data returns an object wth the local data used by the component, these are mutable
         * @returns {{}}
         */
        data() {
            return {}
        },
        /**
         * The methods of the component
         */
        methods: {
            /**
             * formatTags take an array of tags and return a string of pseudo #hash-tags
             * @param tags
             * @returns {string}
             */
            formatTags(tags) {
                let tagString = "";
                for (let tag of tags) {
                    tag = tag.replace(' ', '_');
                    tagString += `#${tag} `
                }
                return tagString
            },
        },
        /**
         * computed members cache their results and listen for a state change before re-fetching the data
         */
        computed: {
            /**
             * ...mapGetters maps store module getters to a local cached accessor
             */
            ...mapGetters({
                /**
                 * autoPlay returns a cached value of the autoPlay setting
                 * @returns {*}
                 */
                autoPlay: 'preferences/autoPlay',
            }),
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
