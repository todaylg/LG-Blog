<template>
<div class="loadingBG">
    <div class="loading">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
    </div>
</div>
</template>

<script>

</script>

<style lang="scss" scoped>
.loadingBG{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:white;
    z-index:9;
}

.loading {
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -14px 0 0 -68px;
    padding: 10px;
}

.loading-dot {
    float: left;
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background: black;
    border-radius: 50%;
    opacity: 0;
    box-shadow: 0 0 2px black;
    animation: loadingFade 1s infinite;
}

.loading-dot:nth-child(1) {
    animation-delay: 0s;
}

.loading-dot:nth-child(2) {
    animation-delay: 0.1s;
}

.loading-dot:nth-child(3) {
    animation-delay: 0.2s;
}

.loading-dot:nth-child(4) {
    animation-delay: 0.3s;
}

.loading-dot:nth-child(5) {
    animation-delay: 0.4s;
}

.loading-dot:nth-child(6) {
    animation-delay: 0.5s;
}

@keyframes loadingFade {
    0% { opacity: 0; }
    50% { opacity: 0.8; }
    100% { opacity: 0; }
}

@keyframes loadingFade {
    0% { opacity: 0; }
    50% { opacity: 0.8; }
    100% { opacity: 0; }
}

</style>
