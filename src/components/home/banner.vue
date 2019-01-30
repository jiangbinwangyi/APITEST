<template>
    <Carousel v-model="value1" loop autoplay>
        <CarouselItem v-for="item in list">
            <div class="demo-carousel">
            	<img :src="item.image_url" alt="" width="100%" />
            </div>
        </CarouselItem>
    </Carousel>
</template>

<script>
    export default {
        data () {
            return {
                value1: 0
            }
        },
        props:['list'],
    }
</script>

<style scoped="scoped">

</style>