<template>
    <select id="main-select" class="form-select" v-model="selected">
        <option value="_none">Choose Utility</option>
        <template v-for="item in items" v-bind:key="item.name">
            <option v-if="item.isGroup" disabled>{{ item.name }}</option>
            <option v-else :value="item.routeName">{{ item.title }}</option>
        </template>
    </select>

</template>

<script>
export default {
    name: "BoxSelect",
    computed: {
        items() {
            const result = []
            const groups = new Set()
            this.$router.getRoutes().filter(route => route.meta.utils).forEach(route => {
                groups.add(route.meta.group)
            })
            Array.from(groups).sort().forEach(group => {
                result.push({name: group, isGroup: true})
                this.$router.getRoutes().filter(route => route.meta.group === group).forEach(route => {
                    result.push({title: route.meta.title, routeName: route.name})
                })
            })
            return result
        }
    },
    watch: {
        '$route.name'(name) {
            for (const item of this.items) {
                if (item.routeName === name) {
                    this.selected = name
                    return
                }
            }
            this.selected = '_none'
        },
        'selected'(name) {
            if (name !== '_none') {
                this.$router.replace({name})
            }
        }
    },
    data() {
        return {
            selected: "_none"
        }
    },

}
</script>

<style scoped>
#main-select {
    width: 32rem;
}
</style>