<template>
    <div class="page">
        <h1 class="page__title">Browse</h1>

        <div class="directory" v-if="categories.length">
            <div class="directory__games">
                <GamePreview :node="category.node" :key="category.cursor" v-for="category in categories"></GamePreview>
            </div>

            <div class="text-center" v-if="categories[categories.length - 1].cursor">
                <button type="button" :class="['directory__button button', {'button--loading': loading}]" @click="more">
                    Load more
                </button>
            </div>
        </div>

        <AppLoading v-else></AppLoading>
    </div>
</template>

<script>

import GamePreview from "@/Components/Game/Preview.vue";
import AppLoading from "@/Components/App/Loading.vue";
import {api} from "@/Utilites/Api.js";

export default {
    name: "DirectoryIndex",
    components: {AppLoading, GamePreview},

    data() {
        return {
            loading: false,
            categories: [],
            query: {
                query: "query GamesDirectory_Query(\n  $gamesCount: Int!\n  $cursor: Cursor\n  $hasTagId: Boolean!\n  $tagId: ID!\n  $tags: [String!]\n  $url: String!\n) {\n  ...GameList_query\n  ...SeoHead_query\n}\n\nfragment ActiveTagFilter_query on Query {\n  contentTag(id: $tagId) {\n    ...useTagLinkFragment_tag\n    id\n    __typename\n  }\n}\n\nfragment DirectoryGameCard_game on Game {\n  ...useGameCardCommonFragment_game\n}\n\nfragment GameList_query on Query {\n  ...ActiveTagFilter_query @include(if: $hasTagId)\n  games(first: $gamesCount, after: $cursor, tags: $tags) {\n    edges {\n      cursor\n      node {\n        id\n        __typename\n        ...DirectoryGameCard_game\n      }\n    }\n  }\n}\n\nfragment SeoHead_query on Query {\n  urlMetadata(url: $url) {\n    title\n    metatags {\n      name\n      attributes {\n        key\n        value\n      }\n    }\n    jsonld\n    share {\n      title\n      text\n      url\n    }\n  }\n}\n\nfragment useGameCardCommonFragment_game on Game {\n  boxArtURL\n  displayName\n  name\n  viewersCount\n  ...useGameTagListFragment_game\n}\n\nfragment useGameTagListFragment_game on Game {\n  gameTags: tags(limit: 10, tagType: CONTENT) {\n    ...useTagLinkFragment_tag\n    id\n    __typename\n  }\n}\n\nfragment useTagLinkFragment_tag on Tag {\n  id\n  __typename\n  tagName\n  localizedDescription\n  localizedName\n}\n",
                variables: {
                    gamesCount: 100,
                    cursor: null,
                    hasTagId: false,
                    tagId: "",
                    tags: null,
                    url: "https://m.twitch.tv/directory"
                }
            }
        }
    },

    mounted() {
        api().fetch(this.query).then(response => {
            if (response.data.games) {
                this.categories = response.data.games.edges;
            }
        });
    },

    methods: {
        more() {
            this.loading = true;
            this.query.variables.cursor = this.categories[this.categories.length - 1].cursor;

            api().fetch(this.query).then(response => {
                if (response.data.games) {
                    this.categories = this.categories.concat(response.data.games.edges);
                }

                this.loading = false;
            });
        }
    }
}
</script>

<style lang="scss">
.directory {
    &__games {
        font-size: 0;
        margin: 0 -8px;
    }

    &__button {
        margin: 0 0 20px;
    }
}
</style>
