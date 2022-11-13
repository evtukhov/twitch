<template>
    <article class="game-preview">
        <RouterLink :to="to" class="game-preview__cover">
            <img class="game-preview__cover-image" width="182" height="243" :src="cover" :alt="node.displayName">
        </RouterLink>

        <header class="game-preview__header">
            <RouterLink class="game-preview__link" :to="to">
                <h4 class="game-preview__title text-clipped">{{ node.displayName }}</h4>
            </RouterLink>

            <div class="game-preview__viewers-count">
                {{ viewersCount }} viewers
            </div>
        </header>
    </article>
</template>

<script>
import {format} from "@/helpers.js";

export default {
    name: "GamePreview",

    props: {
        node: {
            type: Object
        }
    },

    computed: {
        to() {
            return {
                name: 'game.show',
                params: {
                    game: this.node.name
                }
            }
        },

        viewersCount() {
            return format(this.node.viewersCount);
        },

        cover() {
            return this.node.boxArtURL.replace('{width}', 225).replace('{height}', 286)
        }
    }
}
</script>

<style lang="scss">
.game-preview {
    display: inline-block;
    margin-bottom: 20px;
    padding-left: 8px;
    padding-right: 8px;
    width: 50%;
    vertical-align: top;
    font-size: initial;

    a {
        display: block;
        color: inherit;
    }

    &__title {
        margin: 6px 0 3px;
        font-size: 14px;
        font-weight: 600;
        color: #0E0E10;
    }

    &__cover {
        position: relative;
        background-color: #E1E1E1;
        padding-top: 140%;
        border-radius: 12px;
    }

    &__cover-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
    }

    &__viewers-count {
        color: #1F1F23;
        font-size: 13px;
    }

    @media all and (min-width: 600px) {
        width: 33.3333333%;
    }

    @media all and (min-width: 768px) {
        width: 25%;
    }

    @media all and (min-width: 1024px) {
        width: 16.6666666667%;
    }
}
</style>
