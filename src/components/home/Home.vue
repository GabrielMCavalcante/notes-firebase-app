<template>
    <div class="home container">
        <Navigation :navOptions="navOptions"></Navigation>
        <component 
            :is="component" 
            @changeOptions="changeOptions" 
            @changeView="changeView"
        ></component>
    </div>
</template>

<script>
import Navigation from './navigation/Navigation.vue'
import Overview from './pages/Overview.vue'
import EditNote from './pages/EditNote.vue'
export default {
    name: 'Home',
    components: {
        Navigation,
        'Overview': Overview,
        'EditNote': EditNote
    },
    data() {
        return {
            navOptions: new Array(),
            component: 'Overview'
        }
    },
    methods: {
        changeOptions(options) {
            this.navOptions = options
        },
        changeView(view) {
            this.component = view
        }
    }
}
</script>