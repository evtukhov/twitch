<template>
    <div class="search">
        <header class="search__header">
            <button class="search__header-button" @click="back">
                <svg class="search__header-icon" width="24" height="24" viewBox="0 0 20 20" x="0px" y="0px">
                    <g>
                        <path d="M13.5 14.5L9 10l4.5-4.5L12 4l-6 6 6 6 1.5-1.5z"></path>
                    </g>
                </svg>
            </button>

            <form action="#" method="GET" class="search__header__form">
                <input ref="input" @input="search" v-model="query.variables.queryFragment" class="search__header-input" type="text" required placeholder="Search...">
            </form>
        </header>

        <nav class="search__results" v-if="edges.length">
            <div :key="i" v-for="(edge, i) in edges">
                <component :is="edge.node.content.__isSearchSuggestionContent" :node="edge.node"></component>
            </div>
        </nav>
    </div>
</template>

<script>

import SearchSuggestionChannel from '@/Components/Search/Suggestion/Channel';
import SearchSuggestionCategory from '@/Components/Search/Suggestion/Category';
import {api} from "@/Utilites/Api.js";

export default {
    name: "SearchIndex",
    components: {SearchSuggestionCategory, SearchSuggestionChannel},

    data() {
        return {
            loading: false,
            edges: [],
            query: {
                query: "query SearchAutocomplete_Query(\n  $queryFragment: String!\n  $noQueryFragment: Boolean!\n  $requestID: ID\n) {\n  ...SearchAutocomplete_suggestions_d4heS\n}\n\nfragment SearchAutocomplete_suggestions_d4heS on Query {\n  searchSuggestions(queryFragment: $queryFragment, requestID: $requestID) @skip(if: $noQueryFragment) {\n    edges {\n      node {\n        id\n        __typename\n        text\n        content {\n          __typename\n          ...SuggestionSearchItem_suggestion\n          ... on SearchSuggestionCategory {\n            id\n            __typename\n          }\n          ... on SearchSuggestionChannel {\n            id\n            __typename\n          }\n        }\n      }\n    }\n    tracking {\n      modelTrackingID\n      responseID\n    }\n  }\n}\n\nfragment SuggestionSearchItem_suggestion on SearchSuggestionContent {\n  __isSearchSuggestionContent: __typename\n  __typename\n  ... on SearchSuggestionChannel {\n    id\n    __typename\n    isVerified\n    login\n    profileImageURL(width: 50)\n    user {\n      id\n      __typename\n      stream {\n        id\n        __typename\n        game {\n          id\n          __typename\n        }\n      }\n    }\n  }\n  ... on SearchSuggestionCategory {\n    id\n    __typename\n    boxArtURL\n    game {\n      name\n      id\n      __typename\n    }\n  }\n}\n",
                variables: {
                    queryFragment: '',
                    noQueryFragment: false,
                    requestID: ''
                }
            }
        }
    },

    mounted() {
        this.$refs.input.focus();
    },

    methods: {
        back() {
            return window.history.length ? this.$router.go(-1) : this.$router.push('/');
        },

        search() {
            if (this.loading) {
                return false;
            }

            this.loading = true;

            api().fetch(this.query).then(response => {
                if (response.data.searchSuggestions) {
                    this.edges = response.data.searchSuggestions.edges.filter(edge => edge.node.content !== null);
                }

                this.loading = false;
            });
        }
    }
}
</script>

<style lang="scss">
.search {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: #FFF;
    overflow: auto;

    &__header {
        display: flex;
        align-items: center;
        padding: 16px 20px 16px 10px;
    }

    &__header__form {
        flex-grow: 1;
    }

    &__header-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: none;
        padding: 0 6px 0 0;
    }

    &__header-icon {
        margin: 3px 0 0;
    }

    &__header-input {
        flex: none;
        width: 100%;
        padding: 5px 10px;
        color: rgb(14, 14, 16);
        background-color: rgba(0, 0, 0, 0.1);
        background-clip: padding-box;
        font-family: inherit;
        font-size: 16px;
        line-height: 1.5;
        border-style: solid;
        border-width: 2px;
        border-color: rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        appearance: none;

        &:focus {
            background-color: #FFF;
            border-color: #9147FF;
            outline: #9147FF;
        }
    }
}
</style>
