import { createStore } from 'vue';
import auth from './auth/index';
import { LOADING_SPINNER_SHOW_MUTATION } from './store_constants';

const store = createStore({

    modules: {
        auth,
    },
    state() {

        return {
            showLoading: false,
        };
    },
    mutations: {
        
        [LOADING_SPINNER_SHOW_MUTATION](state, payload) {
            state.showLoading = payload;
        },
    },
});

export default store;