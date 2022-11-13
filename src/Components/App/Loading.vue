<template>
    <div>
        <div class="loading"></div>
    </div>
</template>

<script>
export default {
    name: "AppLoading"
}
</script>

<style lang="scss">
.loading {
    display: block;
    position: relative;
    margin: 40px auto;
    height: 2em;
    width: 2em;
    animation: spinAround 500ms infinite linear;
    border: 2px solid #CCC;
    border-radius: 999999px;
    border-right-color: transparent;
    border-top-color: transparent;
}
</style>
