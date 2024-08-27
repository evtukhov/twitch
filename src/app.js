/**
 * Import dependencies.
 */
import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router.js";
import LayoutsDefault from "./Layouts/Default.vue";
import {app} from "@/helpers.js";

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./Views/ExampleComponent.vue -> <example-component></example-component>
 */
const files = require.context('./Views', true, /\.vue$/i);

files.keys().map(key => {
    return Vue.component(key.split('./').pop().replace('/', '').split('.')[0], files(key).default);
});

/**
 * Use vue plugins.
 */
Vue.use(VueRouter);

/**
 * Create app.
 */
app().check().clean(() => {
    new Vue({
        router: router,
        el: '#app',

        render(createElement) {
            return createElement(LayoutsDefault);
        },

        async beforeMount() {
            // Set clientId as global variable for use in request header.
            const response = await fetch('https://m.twitch.tv');
            const rawHTML = await response.text();
            window.clientId = rawHTML.match(/clientId="(.*?)"/)[1];
        },

        mounted() {
            router.afterEach((to) => {
                Vue.nextTick(() => {
                    document.title = to.meta.title ? to.meta.title : 'Twitch';
                });
            });
        }
    })
});
