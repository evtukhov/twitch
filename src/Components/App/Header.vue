<template>
    <header class="app-header">
        <div class="container app-header__container">
            <div class="app-header__column app-header__column--left">
                <RouterLink class="app-header__link app-header__link--logo" :to="to('home.index')">
                    <svg class="app-header__logo" width="32px" height="32px" viewBox="0 0 24 28">
                        <g fill-rule="evenodd">
                            <path d="M19 6v6h-2V6h2zm-7 0h2v6h-2V6zM5 0L0 5v18h6v5l5-5h4l9-9V0H5zm17 13l-4 4h-4l-4 4v-4H6V2h16v11z"></path>
                            <path d="M18 17l4-4V2H6v15h4v4l4-4h4zM12 6h2v6h-2V6zm7 0h-2v6h2V6z" fill="#FFF"></path>
                        </g>
                    </svg>
                </RouterLink>

                <RouterLink class="app-header__link" :to="to('directory.index')">
                    <svg width="24" height="24" viewBox="0 0 20 20" x="0px" y="0px">
                        <g>
                            <path d="M5 2a2 2 0 00-2 2v8a2 2 0 002 2V4h8a2 2 0 00-2-2H5z"></path>
                            <path fill-rule="evenodd" d="M7 8a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H9a2 2 0 01-2-2V8zm2 0h6v8H9V8z" clip-rule="evenodd"></path>
                        </g>
                    </svg>
                </RouterLink>
            </div>

            <div class="app-header__column app-header__column--right">
                <a class="app-header__button button button--primary" href="https://www.twitch.tv/?tt_deeplink=tachyon">
                    Open in App
                </a>

                <RouterLink class="app-header__search" :to="to('search.index')">
                    <svg width="24" height="24" viewBox="0 0 20 20" x="0px" y="0px">
                        <g>
                            <path fill-rule="evenodd" d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z" clip-rule="evenodd"></path>
                        </g>
                    </svg>
                </RouterLink>

                <div>
                    <svg width="24" height="24" viewBox="0 0 20 20" x="0px" y="0px">
                        <g>
                            <path d="M10 18a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM8 4a2 2 0 104 0 2 2 0 00-4 0z"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "AppHeader",
    methods: {
        to(name) {
            return {name};
        }
    }
}
</script>

<style lang="scss">
.app-header {
    position: sticky;
    display: flex;
    align-items: center;
    top: 0;
    padding: 0 1rem;
    height: 50px;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 20%) 0 4px 8px, rgb(0 0 0 / 5%) 0 0 4px;
    z-index: 9;

    &__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    &__column {
        display: flex;
        align-items: center;
    }

    &__logo {
        width: 32px;
        height: 32px;
        fill: #9147FF;
    }

    &__link {
        display: block;

        &--logo {
            margin: 0 25px 0 0;
        }
    }

    &__button {
        display: block;
        margin-right: 16px;
    }

    &__search {
        display: block;
        margin-right: 10px;
    }
}
</style>
