/**
* src/components/StationList.vue
* Vue component to display station list
**/

<template>
    <div>
        <b-table
                :bordered=true
                :busy.sync="isBusy"
                :fields="fields"
                :items="stations"
                :select-mode="selectMode"
                :sort-desc=false
                :striped="striped"
                @row-selected="onRowSelected"
                hover
                id="station-table"
                outlined
                primary-key="id"
                selectable
                selected-variant="success"
                sort-by="name"
        >
            <!-- custom formatted column to show a colored ratings bar instead of the raw field data -->
            <template slot="[popularity]" slot-scope="data">
                <b-progress
                        :max="5"
                        :precision=1
                        :value="data.value"
                        :variant="getRatingColor(data.value)"
                        show-value></b-progress>
            </template>

        </b-table>
    </div>
</template>

<script>
    import {BTable} from 'bootstrap-vue'
    import {BProgress} from 'bootstrap-vue'
    import {mapGetters} from 'vuex'

    export default {
        name: 'StationList',
        components: {
            'b-table': BTable,
            'b-progress': BProgress,
        },
        props: [
            "selectedTags"
        ],
        data() {
            return {
                isBusy: false,  // TODO Add animation while station list is loading, in case it's slow.
                fields: [
                    {
                        key: 'name',
                        label: 'Station',
                        sortable: true
                    },
                    {
                        key: 'reliability',
                        label: 'Quality',
                        sortable: true
                    },
                    {
                        key: 'popularity',
                        label: 'Popular',
                        sortable: true
                    },
                ],
                selectMode: 'single',
                striped: false,
            }
        },
        methods: {
            getRatingColor(value) {
                if (value >= 4)
                    return "success";
                if (value >= 3)
                    return "primary";
                if (value >= 2)
                    return "warning";
                if (value >= 1)
                    return "danger";
                return "danger";
            },
            onRowSelected(items) {
                if (items.length > 0) {
                    this.selected = items[0];
                }
                this.$emit('changedStation', this.selected)
            },
        },
        computed: {
            /**
             * ...mapGetters maps store module getters to a local cached accessor
             */
            ...mapGetters({
                stations: 'stations/getAllStations',
            }),
        },
        created() {
            this.$store.dispatch('stations/getAll')
        },
        calculated: {},
        watch: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .progress {
        background: darkgray;
    }

</style>
