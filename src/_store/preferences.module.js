/**
 * src/_store/preferences.module.js
 * A store module to hold user preferences
 * TODO: store preferences in localstorage between page visits
 * @type {{mutations: {setAutoPlay(*, *): void}, state: {lastStation: null, autoPlay: string, tags: []}, getters: {autoPlay(*): (preferences.getters.autoPlay|(function(*))|*|string|default.watch.autoPlay|default.computed.autoPlay)}, actions: {setAutoPlay: preferences.actions.setAutoPlay}, namespaced: boolean}}
 */
export const preferences = {
    namespaced: true,
    state: {
        autoPlay: 'autoplay',
        lastStation: null,  // TODO: save last station played and if still available, default to that one
        tags: []  // TODO: Add ability for user to add custom tags, and personal ratings -- store in localstorage
    },
    actions: {
        /**
         * setAutoPlay sets flag so that stations do or don't start playing automatically
         * @param context
         * @param autoPlay
         */
        setAutoPlay: function (context, autoPlay) {
            context.commit('setAutoPlay', autoPlay);
        }
    },
    getters: {
        /**
         * autoPlay retrieves the current state of the flag
         * @param state
         * @returns {preferences.getters.autoPlay|(function(*))|*|string|default.watch.autoPlay|default.computed.autoPlay}
         */
        autoPlay(state) {
            return state.autoPlay
        }
    },
    mutations: {
        /**
         * setAutoPlay mutates the value of the state
         * @param state
         * @param autoPlay
         */
        setAutoPlay(state, autoPlay) {
            state.autoPlay = autoPlay
        },
    }
};