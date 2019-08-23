/**
 * src/_store/index.js
 * index to join modules into a single application store
 */

import Vue from 'vue';
import Vuex from 'vuex';

import {stations} from './stations.module'
import {preferences} from './preferences.module'

Vue.use(Vuex);

/**
 * export to use in Vue object giving access to the store from any component
 * @type {Store<unknown>}
 */
export const store = new Vuex.Store({
    modules: {
        stations,
        preferences
    }
});