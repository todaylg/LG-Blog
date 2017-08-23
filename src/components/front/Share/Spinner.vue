<template>
    <div class="spinner">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.spinner{
    height: 1.5rem;
    margin: 1.875rem auto 1.875rem;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
}

.spinner span{
    display: inline-block;
    width: 0.9375rem;
    height: 0.9375rem;
    margin-right: 0.5rem;
    border-radius: 50%;
    background: black;
    animation: spinner 1.04s ease infinite;
}

.spinner span:last-child{
    margin-right: 0;
}

@keyframes spinner{
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}

.spinner span:nth-child(1){
    animation-delay:0.13s;
}

.spinner span:nth-child(2){
    animation-delay:0.26s;
}

.spinner span:nth-child(3){
    animation-delay:0.39s;
}

.spinner span:nth-child(4){
    animation-delay:0.52s;
}

.spinner span:nth-child(5){
    animation-delay:0.65s;
}
</style>
