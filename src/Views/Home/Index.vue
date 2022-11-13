<template>
    <div class="page">
        <div class="page__container container">
            <h1 class="page__title">Welcome to Twitch!</h1>

            <div class="shelves" v-if="edges.length">
                <div class="shelves__shelve shelve" :key="edge.cursor" v-for="edge in _edges">
                    <div class="shelve__header">
                        <ShelveHeader :node="token.node" :key="i"
                                      v-for="(token, i) in edge.node.title.localizedTitleTokens"
                        ></ShelveHeader>
                    </div>

                    <div class="shelve__streams">
                        <component :data-type="stream.node.__typename" :is="stream.node.__typename + 'Preview'"
                                   :node="stream.node" :key="i" v-for="(stream, i) in edge.node.content.edges"
                        ></component>
                    </div>
                </div>
            </div>

            <AppLoading v-else></AppLoading>
        </div>
    </div>
</template>

<script>

import ShelveHeader from "@/Components/Home/ShelveHeader.vue";
import StreamPreview from "@/Components/Stream/Preview.vue";
import GamePreview from "@/Components/Game/Preview.vue";
import ClipPreview from "@/Components/Clip/Preview.vue";
import AppLoading from "@/Components/App/Loading.vue";
import {api} from "@/Utilites/Api.js";

export default {
    name: "HomeIndex",
    components: {AppLoading, GamePreview, StreamPreview, ShelveHeader, ClipPreview},

    data() {
        return {
            loading: false,
            edges: [],
            query: {
                query: "query Homepage_Query(\n  $requestID: String!\n  $platform: String!\n  $limit: Int!\n  $itemsPerRow: Int!\n  $url: String!\n) {\n  ...useRecommendationShelvesFragment_query\n  ...SeoHead_query\n}\n\nfragment SeoHead_query on Query {\n  urlMetadata(url: $url) {\n    title\n    metatags {\n      name\n      attributes {\n        key\n        value\n      }\n    }\n    jsonld\n    share {\n      title\n      text\n      url\n    }\n  }\n}\n\nfragment useGameCardCommonFragment_game on Game {\n  boxArtURL\n  displayName\n  name\n  viewersCount\n  ...useGameTagListFragment_game\n}\n\nfragment useGameTagListFragment_game on Game {\n  gameTags: tags(limit: 10, tagType: CONTENT) {\n    ...useTagLinkFragment_tag\n    id\n    __typename\n  }\n}\n\nfragment useRecommendationShelvesFragment_query on Query {\n  shelves(requestID: $requestID, platform: $platform, first: $limit, itemsPerRow: $itemsPerRow) {\n    edges {\n      node {\n        ...useShelfFragment_shelf\n        id\n        __typename\n      }\n    }\n  }\n}\n\nfragment useShelfFragment_shelf on Shelf {\n  __typename\n  id\n  __typename\n  title {\n    ...useShelfTitleFragment_title\n  }\n  content {\n    __typename\n    edges {\n      __typename\n      trackingID\n      node {\n        __typename\n        ... on Game {\n          ...useShelfGameCardFragment_game\n          id\n          __typename\n        }\n        ... on Stream {\n          broadcaster {\n            login\n            id\n            __typename\n          }\n          ...useShelfStreamCardFragment_stream\n          id\n          __typename\n        }\n        ... on Clip {\n          id\n          __typename\n        }\n        ... on Tag {\n          id\n          __typename\n        }\n        ... on Video {\n          id\n          __typename\n        }\n      }\n    }\n  }\n  trackingInfo {\n    __typename\n    rowName\n  }\n}\n\nfragment useShelfGameCardFragment_game on Game {\n  id\n  __typename\n  name\n  ...useGameCardCommonFragment_game\n}\n\nfragment useShelfStreamCardFragment_stream on Stream {\n  id\n  __typename\n  ...useStreamCardCommonFragment_stream\n  broadcaster {\n    login\n    id\n    __typename\n  }\n}\n\nfragment useShelfTitleFragment_title on ShelfTitle {\n  key\n  fallbackLocalizedTitle\n  localizedTitleTokens {\n    node {\n      __typename\n      ... on Game {\n        __typename\n        id\n        __typename\n        name\n        displayName\n      }\n      ... on TextToken {\n        __typename\n        text\n        hasEmphasis\n        location\n      }\n      ... on Tag {\n        id\n        __typename\n      }\n      ... on User {\n        id\n        __typename\n      }\n    }\n  }\n}\n\nfragment useStreamCardCommonFragment_stream on Stream {\n  id\n  __typename\n  viewersCount\n  previewImageURL\n  type\n  game {\n    id\n    __typename\n    name\n  }\n  broadcaster {\n    id\n    __typename\n    broadcastSettings {\n      title\n      id\n      __typename\n    }\n    login\n    displayName\n    profileImageURL(width: 50)\n  }\n  ...useStreamTagListFragment_stream\n}\n\nfragment useStreamTagListFragment_stream on Stream {\n  streamTags: tags {\n    ...useTagLinkFragment_tag\n    id\n    __typename\n  }\n}\n\nfragment useTagLinkFragment_tag on Tag {\n  id\n  __typename\n  tagName\n  localizedDescription\n  localizedName\n}\n",
                variables: {
                    requestID: '',
                    platform: "mobile_web",
                    limit: 6,
                    itemsPerRow: 8,
                    url: "https://m.twitch.tv/"
                }
            }
        }
    },

    computed: {
        _edges() {
            return this.edges.map(edge => {
                edge.node.content.edges = edge.node.content.edges.filter(edge => edge.node !== null);

                return edge;
            })
        }
    },

    mounted() {
        api().fetch(this.query).then(response => {
            if (response.data.shelves) {
                this.edges = response.data.shelves.edges;
            }
        });
    },
}
</script>

<style lang="scss">
.shelve {
    &__header {
        margin: 0 0 8px;
    }

    &__streams {
        margin: 16px -8px;
        padding: 0 8px;
        white-space: nowrap;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
}
</style>
