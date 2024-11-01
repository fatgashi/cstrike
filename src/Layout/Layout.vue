<template>
    <div>
        <div class="Header">
            <Header/>
        </div>
        <div class="Main">
            <Content/>
        </div>
        <div class="Footer">
            <Footer/>
        </div>
    </div>
</template>

<script>
import Content from './Content.vue';
import Footer from './Footer.vue'
import Header from './Header.vue'

export default {
    name: "LeyOut",
    components: {
        Header,
        Content,
        Footer,
    }
}
</script>