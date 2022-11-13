/**
 * App router.
 */
import VueRouter from "vue-router";
import HomeIndex from './Views/Home/Index.vue'
import DirectoryIndex from './Views/Directory/Index.vue'
import GameShow from './Views/Game/Show.vue'
import StreamShow from './Views/Stream/Show.vue'
import SearchIndex from './Views/Search/Index.vue'

export default new VueRouter({
    mode: 'history',

    // Define routes.
    routes: [
        {
            path: '/',
            alias: '/',
            name: 'home.index',
            component: HomeIndex,
            meta: {
                title: 'Twitch'
            }
        }, {
            path: '/directory',
            name: 'directory.index',
            component: DirectoryIndex,
            meta: {
                title: 'All Categories'
            }
        }, {
            path: '/directory/game/:game',
            name: 'game.show',
            component: GameShow,
            meta: {
                title: 'Game'
            }
        }, {
            path: '/search',
            name: 'search.index',
            component: SearchIndex
        }, {
            path: '/:stream',
            name: 'stream.show',
            component: StreamShow,
            meta: {
                title: 'Stream'
            }
        }
    ]
})

