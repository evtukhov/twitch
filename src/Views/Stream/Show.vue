<template>
    <div class="page">
        <div class="stream">
            <div class="stream__video">
                <video controls v-if="url" :src="url"></video>
            </div><!--
                Inline-block space fix
            --><div class="stream__content">
                <div class="stream__columns" v-if="channel">
                    <div class="stream__user">
                        <figure class="stream__user-avatar">
                            <img class="stream__user-avatar-image" :src="channel.profileImageURL" :alt="channel.displayName">
                        </figure>
                    </div>

                    <div class="stream__info">
                        <h1 class="stream__title text-clipped">{{ channel.displayName }}</h1>
                        <p>
                            <span>Playing </span>
                            <RouterLink class="stream__link" :to="to">
                                {{ channel.broadcastSettings.game.displayName }}
                            </RouterLink>
                        </p>
                    </div>
                </div>

                <div class="stream__chat">
                    <span>Chat currently is not available.</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {api} from "@/Utilites/Api.js";

export default {
    name: "StreamShow",

    data() {
        return {
            loading: false,
            channel: null,
            user: null,
            stream: {
                parameters: {
                    player_type: "pulsar",
                    player_backend: "mediaplayer",
                    playlist_include_framerate: "true",
                    allow_source: "true",
                    cdm: "wv",
                    player_version: "1.15.0",
                }
            },
            query: {
                query: "query Channel_Query(\n  $login: String!\n  $isBrowser: Boolean!\n  $url: String!\n  $platform: String!\n  $playerType: String!\n  $skipPlayToken: Boolean!\n) {\n  channel: user(login: $login) {\n    ...StreamPlayer_channel\n    ...StreamInfoBox_channel\n    id\n    __typename\n    login\n    displayName\n    description\n    broadcastSettings {\n      id\n      __typename\n      title\n      game {\n        displayName\n        id\n        __typename\n      }\n    }\n    stream {\n      id\n      __typename\n      createdAt\n      height\n      previewImageURL\n      game {\n        id\n        __typename\n        name\n      }\n    }\n  }\n  channelHome: user(login: $login) @skip(if: $isBrowser) {\n    ...ChannelLayout_user\n    id\n    __typename\n    login\n    displayName\n    stream {\n      id\n      __typename\n      ...FeaturedSection_stream\n    }\n    archives: videos(first: 1, type: ARCHIVE, sort: TIME) {\n      edges {\n        node {\n          ...FeaturedSection_archives\n          id\n          __typename\n        }\n      }\n    }\n    videoShelves(first: 1) {\n      edges {\n        node {\n          title\n          items {\n            __typename\n            ...VideoShelf_items\n            ... on Clip {\n              id\n              __typename\n            }\n            ... on Video {\n              id\n              __typename\n            }\n          }\n          id\n          __typename\n        }\n      }\n    }\n    channel {\n      home {\n        shelves {\n          categoryShelf {\n            edges {\n              node {\n                ...CategoryShelf_items\n                id\n                __typename\n              }\n            }\n          }\n          streamerShelf {\n            edges {\n              node {\n                ...StreamerShelf_items\n                id\n                __typename\n              }\n            }\n          }\n        }\n      }\n      id\n      __typename\n    }\n  }\n  ...SeoHead_query\n  ...StreamPlayer_token\n}\n\nfragment CategoryShelf_items on Game {\n  id\n  __typename\n  name\n  ...GameCard_game\n}\n\nfragment ChannelCover_user on User {\n  login\n  bannerImageURL\n  primaryColorHex\n}\n\nfragment ChannelDescription_user on User {\n  login\n  displayName\n  description\n  lastBroadcast {\n    game {\n      displayName\n      id\n      __typename\n    }\n    id\n    __typename\n  }\n  videos(first: 30) {\n    edges {\n      node {\n        id\n        __typename\n        game {\n          id\n          __typename\n          displayName\n        }\n      }\n    }\n  }\n}\n\nfragment ChannelFeaturedCardStream_stream on Stream {\n  id\n  __typename\n  broadcaster {\n    broadcastSettings {\n      title\n      id\n      __typename\n    }\n    id\n    __typename\n    login\n  }\n  previewImageURL\n  game {\n    displayName\n    id\n    __typename\n  }\n}\n\nfragment ChannelFeaturedCardVideo_video on Video {\n  id\n  __typename\n  title\n  viewCount\n  previewThumbnailURL\n  publishedAt\n  game {\n    name\n    id\n    __typename\n  }\n}\n\nfragment ChannelLayout_user on User {\n  ...ChannelCover_user\n  ...ChannelProfileInfo_user\n  id\n  __typename\n  login\n}\n\nfragment ChannelName_user on User {\n  displayName\n  login\n  roles {\n    isPartner\n  }\n}\n\nfragment ChannelProfileInfo_user on User {\n  ...ChannelStatus_user\n  ...ChannelDescription_user\n  ...ChannelName_user\n  ...SocialMediaLinks_user\n  ...useFollowChannelFragment\n  profileImageURL(width: 150)\n  login\n  displayName\n  primaryColorHex\n  followers {\n    totalCount\n  }\n  stream {\n    id\n    __typename\n  }\n}\n\nfragment ChannelStatus_user on User {\n  lastBroadcast {\n    id\n    __typename\n    startedAt\n    game {\n      id\n      __typename\n      displayName\n    }\n  }\n  stream {\n    id\n    __typename\n    createdAt\n    game {\n      id\n      __typename\n      displayName\n    }\n    type\n    viewersCount\n  }\n}\n\nfragment FeaturedSection_archives on Video {\n  ...ChannelFeaturedCardVideo_video\n}\n\nfragment FeaturedSection_stream on Stream {\n  ...ChannelFeaturedCardStream_stream\n}\n\nfragment GameCard_game on Game {\n  name\n  id\n  __typename\n  displayName\n  viewersCount\n  boxArtURL\n}\n\nfragment SeoHead_query on Query {\n  urlMetadata(url: $url) {\n    title\n    metatags {\n      name\n      attributes {\n        key\n        value\n      }\n    }\n    jsonld\n    share {\n      title\n      text\n      url\n    }\n  }\n}\n\nfragment SocialMediaLinks_user on User {\n  channel {\n    id\n    __typename\n    socialMedias {\n      id\n      __typename\n      name\n      title\n      url\n    }\n  }\n}\n\nfragment StreamInfoBox_channel on User {\n  login\n  displayName\n  profileImageURL(width: 50)\n  stream {\n    id\n    __typename\n    game {\n      name\n      id\n      __typename\n    }\n    ...useStreamTagListFragment_stream\n  }\n  ...useFollowChannelFragment\n}\n\nfragment StreamPlayer_channel on User {\n  id\n  __typename\n  displayName\n  login\n  offlineImageURL\n  roles {\n    isPartner\n  }\n  self {\n    subscriptionBenefit {\n      id\n      __typename\n    }\n  }\n  stream {\n    id\n    __typename\n    game {\n      id\n      __typename\n      name\n    }\n    createdAt\n    previewImageURL\n    restrictionType\n    self {\n      canWatch\n    }\n    archiveVideo {\n      id\n      __typename\n    }\n  }\n  broadcastSettings {\n    isMature\n    id\n    __typename\n  }\n  videos(sort: TIME, first: 3) {\n    edges {\n      node {\n        id\n        __typename\n        previewThumbnailURL\n        title\n        status\n      }\n    }\n  }\n}\n\nfragment StreamPlayer_token on Query {\n  user(login: $login) {\n    login\n    stream @skip(if: $skipPlayToken) {\n      playbackAccessToken(params: {platform: $platform, playerType: $playerType}) {\n        signature\n        value\n        expiresAt\n        authorization {\n          isForbidden\n          forbiddenReasonCode\n        }\n      }\n      id\n      __typename\n    }\n    id\n    __typename\n  }\n}\n\nfragment StreamerShelf_items on User {\n  id\n  __typename\n  ...UserCard_user\n}\n\nfragment UserCard_user on User {\n  id\n  __typename\n  displayName\n  login\n  stream {\n    viewersCount\n    id\n    __typename\n  }\n  primaryColorHex\n  profileImageURL(width: 150)\n}\n\nfragment VideoShelfClip_clip on Clip {\n  id\n  __typename\n  broadcaster {\n    login\n    id\n    __typename\n  }\n  clipCreatedAt: createdAt\n  durationSeconds\n  game {\n    name\n    displayName\n    id\n    __typename\n  }\n  slug\n  thumbnailURL\n  clipTitle: title\n  clipViewCount: viewCount\n}\n\nfragment VideoShelfVideo_video on Video {\n  id\n  __typename\n  createdAt\n  lengthSeconds\n  game {\n    name\n    displayName\n    id\n    __typename\n  }\n  previewThumbnailURL\n  title\n  viewCount\n}\n\nfragment VideoShelf_items on VideoShelfItem {\n  __isVideoShelfItem: __typename\n  __typename\n  ... on Clip {\n    id\n    __typename\n    game {\n      name\n      id\n      __typename\n    }\n    ...VideoShelfClip_clip\n  }\n  ... on Video {\n    id\n    __typename\n    game {\n      name\n      id\n      __typename\n    }\n    ...VideoShelfVideo_video\n  }\n}\n\nfragment useFollowChannelFragment on User {\n  id\n  __typename\n  self {\n    follower {\n      followedAt\n    }\n  }\n}\n\nfragment useStreamTagListFragment_stream on Stream {\n  streamTags: tags {\n    ...useTagLinkFragment_tag\n    id\n    __typename\n  }\n}\n\nfragment useTagLinkFragment_tag on Tag {\n  id\n  __typename\n  tagName\n  localizedDescription\n  localizedName\n}\n",
                variables: {
                    login: this.$route.params.stream,
                    isBrowser: true,
                    url: "https://m.twitch.tv/" + this.$route.params.stream,
                    platform: "web",
                    playerType: "pulsar",
                    skipPlayToken: false
                }
            }
        }
    },

    mounted() {
        api().fetch(this.query).then(response => {

            this.user = response.data.user;
            this.channel = response.data.channel;

            if (response.data.user.stream) {
                this.stream.parameters = Object.assign(this.stream.parameters, {
                    token: encodeURI(response.data.user.stream.playbackAccessToken.value),
                    sig: response.data.user.stream.playbackAccessToken.signature,
                });
            }
        });

        this.$nextTick(() => {
            document.title = decodeURI(this.$route.params.stream);
        })
    },

    computed: {
        to() {
            return {
                name: 'game.show',
                params: {
                    game: this.channel.broadcastSettings.game.displayName
                }
            }
        },

        url() {
            return this.user ? `https://usher.ttvnw.net/api/channel/hls/${this.user.login}.m3u8?${this._query}` : null;
        },

        _query() {
            return Object.keys(this.stream.parameters).map(key => `${key}=${this.stream.parameters[key]}`).join('&');
        }
    }
}
</script>

<style lang="scss">
.stream {
    margin: -20px -8px 20px;

    &__video {
        position: relative;
        padding-top: 56.2%;
        background-color: #000;

        video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }

    &__columns {
        display: flex;
        border-bottom: 1px solid #E1E1E1;
        padding: 20px 10px;
    }

    &__chat {
        padding: 40px;
        text-align: center;
    }

    &__user,
    &__info {
        flex: none;
    }

    &__user {
        width: 50px;
        margin: 0 20px 0 0;
    }

    &__info {
        width: calc(100% - 70px);
    }

    &__user-avatar-image {
        border-radius: 99999px;
    }

    &__title {
        font-size: 24px;
        font-weight: 500;
        margin: 0 0 6px;
    }

    &__link {
        color: #9147FF;
    }

    @media all and (min-width: 1024px) {
        &__video,
        &__content {
            display: inline-block;
            vertical-align: top;
        }

        &__video {
            width: calc(100% - 280px);
        }

        &__content {
            width: 280px;
        }
    }
}
</style>
