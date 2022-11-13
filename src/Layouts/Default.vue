<template>
    <div>
        <AppHeader></AppHeader>

        <RouterView></RouterView>
    </div>
</template>

<script>

import AppHeader from "@/Components/App/Header";

export default {
    name: 'LayoutsDefault',
    components: {AppHeader}
}
</script>

<style lang="scss">
@keyframes spinAround {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(359deg);
    }
}

html {
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}

img {
    display: inline-block;
    max-width: 100%;
    height: auto;
}

a {
    text-decoration: none;
    color: #333;
}

body {
    background: #F7F7F8;
    font-size: 14px;
    line-height: 1.4;
}

button,
.button {
    position: relative;
    display: inline-block;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    color: #FFF;
    background-color: #9147FF;
    font-weight: 700;
    border-radius: 4px;
    border: 1px solid #9147FF;
    cursor: pointer;

    &--loading {
        color: transparent !important;

        &:after {
            content: '';
            display: block;
            position: absolute;
            top: calc(50% - .5em);
            left: calc(50% - .5em);
            margin: 0 auto;
            height: 1em;
            width: 1em;
            animation: spinAround 500ms infinite linear;
            border: 2px solid #CCC;
            border-radius: 999999px;
            border-right-color: transparent;
            border-top-color: transparent;
        }
    }
}

.text-center {
    text-align: center;
}

.text-clipped {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &[data-lines="2"] {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: normal;
        text-overflow: initial;
    }
}

.page {
    padding-top: 20px;
    padding-left: 8px;
    padding-right: 8px;

    &__title {
        font-size: 36px;
        margin: 0 0 16px;
    }
}
</style>
