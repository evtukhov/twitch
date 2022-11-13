<template>
    <RouterLink :to="to" class="search-suggestion search-suggestion--category">
        <figure class="search-suggestion__cover">
            <img class="search-suggestion__cover-image" width="40" height="54" :src="src" :alt="node.text">
        </figure>

        <h4 class="search-suggestion__title">{{ node.text }}</h4>
    </RouterLink>
</template>

<script>
export default {
    name: "SearchSuggestionCategory",

    props: {
        node: {
            type: Object
        }
    },

    computed: {
        src() {
            return this.node.content.boxArtURL.replace('{width}', 416).replace('{height}', 555);
        },

        to() {
            return {
                name: 'game.show',
                params: {
                    game: this.node.text
                }
            }
        }
    }
}
</script>

<style lang="scss">
.search-suggestion {
    display: flex;
    align-items: center;
    padding: 4px 20px;

    &__title {
        font-size: 18px;
    }

    &__cover {
        flex: none;
        width: 40px;
        min-height: 54px;
        margin-right: 10px;
    }
}
</style>
