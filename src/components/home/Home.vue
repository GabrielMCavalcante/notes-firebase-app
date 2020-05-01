<template>
    <div class="home container">
        <Navigation :navOptions="navOptions"></Navigation>
        <component :is="'Overview'" @overview="changeOptions"></component>
    </div>
</template>

<script>
import Navigation from './navigation/Navigation.vue'
import Overview from './pages/Overview.vue'
export default {
    name: 'Home',
    components: {
        Navigation,
        'Overview': Overview
    },
    data() {
        return {
            navOptions: new Array()
        }
    },
    methods: {
        changeOptions(options) {
            this.navOptions = options;
        }
    }
}
</script>