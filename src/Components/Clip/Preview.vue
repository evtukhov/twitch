<template>
    <div class="clip-preview">
        <div class="clip-preview__cover"></div>
    </div>
</template>

<script>
export default {
    name: "ClipPreview",

    props: {
        node: {
            type: Object
        }
    }
}
</script>

<style lang="scss">
.clip-preview {
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 100px);

    &:not(:last-child) {
        margin-right: 16px;
    }

    &__cover {
        padding-top: 56.2%;
        background-color: #E1E1E1;
        border-radius: 12px;
    }

    @media all and (min-width: 768px) {
        width: calc(40% - 40px);
    }
}
</style>
