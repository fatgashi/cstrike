<template>
    <div>
        <div class="Header">
            <AppHeader/>
        </div>
        <div class="Main">
            <AppContent/>
        </div>
        <div class="Footer">
            <AppFooter/>
        </div>
    </div>
</template>

<script>
import Content from './Content.vue';
import Footer from './Footer.vue'
import Header from './Header.vue'

export default {
    name: "LayoutView",
    components: {
        AppHeader: Header,
        AppContent: Content,
        AppFooter: Footer,
    }
}
</script>