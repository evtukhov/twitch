<template>
    <div class="page">
        <GameInfo v-if="game" :game="game"></GameInfo>

        <div class="game-streams" v-if="game">
            <StreamPreview class="game-streams__preview" :node="edge.node"
                           :key="edge.cursor" v-for="edge in _streams"
            ></StreamPreview>
        </div>

        <AppLoading v-else></AppLoading>

        <div v-if="game && _streams[_streams.length - 1].cursor" class="text-center">
            <button type="button" :class="['directory__button button', {'button--loading': loading}]" @click="more">
                Load more
            </button>
        </div>
    </div>
</template>

<script>

import GameInfo from "@/Components/Game/Info.vue";
import StreamPreview from "@/Components/Stream/Preview.vue";
import AppLoading from "@/Components/App/Loading.vue";
import {api} from "@/Utilites/Api.js";

export default {
    name: "GameShow",
    components: {AppLoading, StreamPreview, GameInfo},

    data() {
        return {
            loading: false,
            game: null,
            query: {
                query: "query GameDirectory_Query(\n  $gameAlias: String!\n  $channelsCount: Int!\n  $cursor: Cursor\n  $hasTagId: Boolean!\n  $tagId: ID!\n  $tags: [String!]\n  $url: String!\n) {\n  ...TopChannelsForGame_query\n  game(name: $gameAlias) {\n    name\n    displayName\n    id\n    __typename\n  }\n  ...SeoHead_query\n}\n\nfragment ActiveTagFilter_query on Query {\n  contentTag(id: $tagId) {\n    ...useTagLinkFragment_tag\n    id\n    __typename\n  }\n}\n\nfragment DirectoryStreamCard_stream on Stream {\n  ...useStreamCardCommonFragment_stream\n  broadcaster {\n    login\n    id\n    __typename\n  }\n}\n\nfragment SeoHead_query on Query {\n  urlMetadata(url: $url) {\n    title\n    metatags {\n      name\n      attributes {\n        key\n        value\n      }\n    }\n    jsonld\n    share {\n      title\n      text\n      url\n    }\n  }\n}\n\nfragment TopChannelsForGame_query on Query {\n  ...ActiveTagFilter_query @include(if: $hasTagId)\n  game(name: $gameAlias) {\n    name\n    displayName\n    ...useGameDetailsFragment_game\n    streams(first: $channelsCount, after: $cursor, tags: $tags) {\n      edges {\n        cursor\n        node {\n          id\n          __typename\n          ...DirectoryStreamCard_stream\n        }\n      }\n    }\n    id\n    __typename\n  }\n}\n\nfragment useGameDetailsFragment_game on Game {\n  boxArtURL\n  displayName\n  followersCount\n  name\n  viewersCount\n  ...useGameTagListFragment_game\n}\n\nfragment useGameTagListFragment_game on Game {\n  gameTags: tags(limit: 10, tagType: CONTENT) {\n    ...useTagLinkFragment_tag\n    id\n    __typename\n  }\n}\n\nfragment useStreamCardCommonFragment_stream on Stream {\n  id\n  __typename\n  viewersCount\n  previewImageURL\n  type\n  game {\n    id\n    __typename\n    name\n  }\n  broadcaster {\n    id\n    __typename\n    broadcastSettings {\n      title\n      id\n      __typename\n    }\n    login\n    displayName\n    profileImageURL(width: 50)\n  }\n  ...useStreamTagListFragment_stream\n}\n\nfragment useStreamTagListFragment_stream on Stream {\n  streamTags: tags {\n    ...useTagLinkFragment_tag\n    id\n    __typename\n  }\n}\n\nfragment useTagLinkFragment_tag on Tag {\n  id\n  __typename\n  tagName\n  localizedDescription\n  localizedName\n}\n",
                variables: {
                    gameAlias: decodeURI(this.$route.params.game).toLowerCase(),
                    channelsCount: 100,
                    cursor: null,
                    hasTagId: false,
                    tagId: "",
                    tags: null,
                    url: "https://m.twitch.tv/directory/game/" + this.$route.params.game
                }
            }
        }
    },

    computed: {
        _streams() {
            return this.game.streams.edges || [];
        }
    },

    mounted() {
        api().fetch(this.query).then(response => this.game = response.data.game);

        this.$nextTick(() => {
            document.title = decodeURI(this.$route.params.game);
        });
    },

    methods: {
        more() {
            this.loading = true;
            this.query.variables.cursor = this.game.streams.edges[this.game.streams.edges.length - 1].cursor;

            api().fetch(this.query).then(response => {
                if (response.data.game.streams.edges) {
                    this.game.streams.edges = this.game.streams.edges.concat(response.data.game.streams.edges);
                }

                this.loading = false;
            });
        }
    }
}
</script>

<style lang="scss">
.game-streams {
    &__preview {
        width: 100%;
        margin: 0 0 16px;

        &:not(:last-child) {
            margin-right: 0;
        }
    }

    @media all and (min-width: 414px) {
        &__preview {
            width: 50%;
            padding: 0 8px;
        }
    }

    @media all and (min-width: 768px) {
        &__preview {
            width: 33.33333%;
        }
    }

    @media all and (min-width: 1024px) {
        &__preview {
            width: 25%;
        }
    }
}
</style>
