<template>
    <div class="game-info">
        <div class="game-info__col game-info__col--cover">
            <img width="138" height="184" :src="cover" :alt="game.displayName">
        </div>

        <div class="game-info__col game-info__col--props">
            <h1 class="game-info__title text-clipped" data-lines="2">
                {{ game.displayName }}
            </h1>

            <div class="game-info__counters">
                <span class="game-info__viewers"><b>{{ viewersCount }}</b> Viewers · </span>
                <span class="game-info__followers"><b>{{ followersCount }}</b> Followers</span>
            </div>

            <div class="game-info__tags">
                <span class="game-info__tag" :key="tag.id" v-for="tag in game.gameTags">
                    {{ tag.localizedName }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import {format} from "@/helpers.js";

export default {
    name: "GameInfo",

    props: {
        game: {
            type: Object
        }
    },

    computed: {
        cover() {
            return this.game.boxArtURL.replace('{width}', 138).replace('{height}', 184);
        },

        viewersCount() {
            return format(this.game.viewersCount);
        },

        followersCount() {
            return format(this.game.followersCount);
        }
    }
}
</script>

<style lang="scss">
.game-info {
    margin: 0 0 20px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &__col {
        flex: none;

        &--cover {
            width: 24%;
            margin: 0 3% 0 0;
        }

        &--props {
            width: 73%;
        }
    }

    &__title {
        margin: 0 0 4px;
        font-size: 18px;
        line-height: 1.3;
    }

    &__tag {
        display: inline-block;
        vertical-align: top;
        margin: 8px 6px 0 0;
        padding: 0 8px;
        height: 20px;
        max-width: 100%;
        color: rgba(0, 0, 0, 0.7);
        background-color: rgba(0, 0, 0, 0.05);
        font-size: 12px;
        font-weight: 600;
        border: 2px solid transparent;
        border-radius: 9000px;
    }

    @media all and (min-width: 600px) {
        &__col {
            &--cover {
                width: 12%;
                margin: 0 3% 0 0;
            }

            &--props {
                width: 85%;
            }
        }
    }
}
</style>
