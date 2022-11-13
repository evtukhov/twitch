<template>
    <article class="stream-preview" :id="id">
        <RouterLink :to="to.stream" class="stream-preview__cover">
            <img class="stream-preview__image" :src="_stream.src" alt="">
            <span class="stream-preview__type">{{ _stream.type }}</span>
            <span class="stream-preview__viewers">{{ _stream.viewersCount }} viewers</span>
        </RouterLink>

        <div class="stream-preview__info">
            <div class="stream-preview__info-col stream-preview__info-col--avatar">
                <img class="stream-preview__avatar-image" width="275" height="173" :src="_stream.broadcaster.profileImageURL" :alt="_stream.broadcaster.displayName">
            </div>
            <div class="stream-preview__info-col stream-preview__info-col--header">
                <header class="stream-preview__header">
                    <RouterLink :to="to.stream">
                        <h3 class="stream-preview__title">{{ _stream.broadcaster.broadcastSettings.title }}</h3>
                    </RouterLink>

                    <RouterLink class="stream-preview__broadcaster" :to="to.stream">
                        {{ _stream.broadcaster.displayName }}
                    </RouterLink>

                    <RouterLink class="stream-preview__game" :to="to.game">
                        {{ _stream.game.name }}
                    </RouterLink>
                </header>

                <footer class="stream-preview__tags">
                    <div :key="i" v-for="(tag, i) in _stream.streamTags" class="stream-preview__tag">
                        {{ tag.localizedName }}
                    </div>
                </footer>
            </div>
        </div>
    </article>
</template>

<script>
import {format} from "@/helpers.js";

export default {
    name: "StreamPreview",

    props: {
        node: {
            type: Object
        }
    },

    computed: {
        id() {
            return 'stream-' + this.node.id;
        },

        to() {
            return {
                game: {
                    name: 'game.show',
                    params: {game: this._stream.slug.game}
                },
                stream: {
                    name: 'stream.show',
                    params: {stream: this._stream.slug.stream}
                }
            }
        },

        _stream() {
            let stream = this.node;

            stream.src = this.src(stream.previewImageURL);
            stream.viewersCount = format(stream.viewersCount);
            stream.slug = {
                stream: stream.broadcaster.login,
                game: stream.game.name,
            };

            return stream;
        }
    },

    methods: {
        src(pattern) {
            if (!pattern) {
                return '#';
            }

            return pattern.replace('{width}', 326).replace('{height}', 205);
        }
    }
}
</script>

<style lang="scss">
.stream-preview {
    width: calc(100% - 100px);
    display: inline-block;
    vertical-align: top;

    &:not(:last-child) {
        margin-right: 16px;
    }

    &__cover {
        display: block;
        position: relative;
        padding: 30%;
        margin: 0 0 10px;
        background-color: #E1E1E1;
        border-radius: 12px;
        overflow: hidden;
    }

    &__image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
    }

    &__type,
    &__viewers {
        display: inline-block;
        position: absolute;
        left: 0;
        padding: 2px 6px;
        margin: 10px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border-radius: 3px;
        pointer-events: none;
    }

    &__type {
        top: 0;
        text-transform: uppercase;
        background-color: #EB0400;
        font-weight: 700;
    }

    &__viewers {
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }

    &__info {
        display: flex;
    }

    &__info-col {
        flex: none;
        width: calc(100% - 50px);

        &--avatar {
            width: 35px;
            margin: 0 15px 0 0;
        }
    }

    &__avatar-image {
        border-radius: 99999px;
    }

    &__title {
        margin: 0 0 6px;
        color: #0E0E10;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 600;
        overflow: hidden;
    }

    &__game {
        margin: 3px 0 2px;
        color: #53535F;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    &__tags {
        white-space: nowrap;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
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

    @media all and (min-width: 768px) {
        width: calc(40% - 40px);
    }
}
</style>
