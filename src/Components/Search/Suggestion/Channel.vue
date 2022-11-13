<template>
    <RouterLink :to="to" class="search-suggestion search-suggestion--channel">
        <figure class="search-suggestion__avatar">
            <img class="search-suggestion__avatar-image" :src="_channel.profileImageURL" :alt="_channel.login">
        </figure>

        <div class="search-suggestion__streamer">
            <h4 class="search-suggestion__title">
                {{ node.text }}
            </h4>

            <div class="search-suggestion__badge search-suggestion__badge--verified" v-if="_channel.isVerified">
                <svg width="18px" height="18px" viewBox="0 0 20 20" x="0px" y="0px">
                    <path fill="#9147FF" fill-rule="evenodd" clip-rule="evenodd" d="M10 2l6 2 2 6-2 6-6 2-6-2-2-6 2-6 6-2zM8.889 13.636l5.43-5.429-1.415-1.414-4.015 4.015-2.015-2.015-1.414 1.414 3.429 3.43z"></path>
                </svg>
            </div>
        </div>

        <div class="search-suggestion__badge search-suggestion__badge--status" v-if="_channel.user.stream">
            <span>Live</span>
        </div>
    </RouterLink>
</template>

<script>
export default {
    name: "SearchSuggestionChannel",

    props: {
        node: {
            type: Object
        }
    },

    computed: {
        _channel() {
            return this.node.content;
        },

        to() {
            return {
                name: 'stream.show',
                params: {
                    stream: this._channel.login
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

    &__avatar {
        flex: none;
        margin-right: 10px;
    }

    &__avatar-image {
        width: 40px;
        height: 40px;
        border-radius: 99999px;
    }

    &__streamer {
        display: flex;
        flex-grow: 1;
    }

    &__title {
        font-size: 18px;
    }

    &__badge {
        &--verified {
            margin: 0 0 0 4px;
        }

        &--status {
            float: right;
            color: #FFF;
            background-color: #EB0400;
            padding: 2px 4px;
            font-size: 12px;
            border-radius: 3px;
        }
    }
}
</style>
