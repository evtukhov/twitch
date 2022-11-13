<template>
    <span class="shelve-header">
        <RouterLink v-if="isName('Game')" :to="route">
            {{ node.displayName }}
        </RouterLink>
        <template v-else>{{ node.text }}</template>
    </span>
</template>

<script>

export default {
    name: "ShelveHeader",

    props: {
        node: {
            type: Object
        }
    },

    computed: {
        route() {
            return {
                name: 'game.show',
                params: {
                    game: this.node.name
                }
            };
        }
    },

    methods: {
        isName(name) {
            return this.node.__typename === name;
        }
    }
}
</script>

<style lang="scss">
.shelve-header {
    font-weight: 600;
    font-size: 14px;

    a {
        color: #9147FF;
    }

    @media all and (min-width: 1024px) {
        font-size: 24px;
    }
}
</style>
