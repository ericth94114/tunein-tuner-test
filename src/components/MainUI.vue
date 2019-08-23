/**
* src/components/MainUI.vue
* Vue component to act as parent to the other components
**/

<template>
    <b-container>
        <b-row>
            <b-col md="auto">
                <!-- link back to the top of the SPA (will reload the page) -->
                <h1><a href="\">{{ msg }}</a></h1>
            </b-col>
            <b-col align-self="center" md="auto">
                <!-- checkbox to disable starting the audio playback immediately when a station is selected-->
                <b-form-checkbox
                        id="auto-play-checkbox"
                        name="auto-play-checkbox"
                        unchecked-value='autoplay-off'
                        v-model="autoPlay"
                        value="autoplay"
                >
                    Play station immediately when selected
                </b-form-checkbox>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="auto">
                <p>Select tags to filter stations</p>
            </b-col>
            <b-col>
                <b-form-group>
                    <!-- a checkbox for each of the tags on any of the stations
                    for filtering the display of the stations list -->
                    <b-form-checkbox-group
                            :options="allTags"
                            id="checkbox-group-1"
                            name="tags-1"
                            v-model="selectedTags"
                    ></b-form-checkbox-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="5">
                <!-- the actual list of stations -->
                <StationList
                        :selectedTags=selectedTags
                        @changedStation="changedStation"
                ></StationList>
            </b-col>
            <b-col>
                <!-- alternative displays to display instructions if no station is selected -->
                <StartingInstructions
                        v-if="selected === null"
                ></StartingInstructions>
                <StationDetails
                        :deets="selected"
                        v-else
                ></StationDetails>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    import StationList from './StationList'
    import {BCol, BContainer, BFormCheckbox, BFormCheckboxGroup, BFormGroup, BRow} from 'bootstrap-vue'
    import StationDetails from "./StationDetails";
    import StartingInstructions from "./StartingInstructions";

    export default {
        name: 'MainUI',
        components: {
            StartingInstructions,
            StationDetails,
            StationList,// e.g. {"id":"s306935","description":"The Element West is the first 24/7 West Coast station. Your host DJ Carisma plays nothing but the hottest West Coast hip hop, breaking the artists of tomorrow before you hear them anywhere else.","name":"The Element West","imgUrl":"https://cdn-profiles.tunein.com/s306935/images/logoq.jpg","streamUrl":"http://tunein4.streamguys1.com/elmntfree1","reliability":64,"popularity":3.0,"tags":["hip hop","music"]}
            'b-container': BContainer,
            'b-row': BRow,
            'b-col': BCol,
            'b-form-checkbox': BFormCheckbox,
            'b-form-group': BFormGroup,
            'b-form-checkbox-group': BFormCheckboxGroup
        },
        data() {
            return {
                selected: null,
                autoPlay: 'autoplay',
                selectedTags: [],  // Start off with no filters selected -- this shows all rows
            }
        },
        props: {
            msg: String
        },
        methods: {
            /**
             * changedStation is called when the child component StationList emits a message that
             * a new station has been selected
             * @param details
             */
            changedStation(details) {
                this.selected = details
            },
            /**
             * ...mapActions maps store module actions to a local function name
             */
            ...mapActions({
                setAutoPlay: 'preferences/setAutoPlay'
            })
        },
        computed: {
            /**
             * ...mapGetters maps store module getters to a local cached accessor
             */
            ...mapGetters({
                getAutoPlay: 'preferences/autoPlay',
                allTags: 'stations/getAllTags',
                stations: 'stations/getAllStations',
            }),
        },
        watch: {
            /**
             * autoPlay watches the value of the autoPlay checkbox and stores the new value for use in other components
             * @param newV
             */
            autoPlay(newV) {
                this.$store.dispatch('preferences/setAutoPlay', newV);
            },
            selectedTags(newV) {
                if (newV.length === 0) {
                    // un-mute all rows, since no filters are enabled.
                    for (const station of this.stations) {
                        const element = document.getElementById(`station-table__row_${station.id}`);
                        element.classList.remove("hide-row");
                    }
                    return;
                }
                // hide each row
                for (const station of this.stations) {
                    const element = document.getElementById(`station-table__row_${station.id}`);
                    element.classList.add("hide-row");
                    // check for a matching tag from the list of selected ones, if present in station, show the row
                    for (const tag of newV) {
                        if (station.tags.includes(tag)) {
                            element.classList.remove("hide-row");
                        }
                    }
                }
            },
        }
    }
</script>

<style>
    #station-table tr.hide-row {
        display: none;
    }

</style>
