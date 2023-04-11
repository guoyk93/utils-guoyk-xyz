<script setup>
import {RouterView} from 'vue-router'
</script>

<template>
    <div class="row">
        <template v-if="selected !== '_none'">
            <div class="col-12 pt-3 d-flex flex-row justify-content-between align-items-baseline">
                <h4>
                    <router-link class="text-decoration-none" :to="{name:'home'}">
                        <b class="ms-2">
                            <bootstrap-icon icon="tools" class="me-2"/>
                            <span>y.k.'s utilities</span>
                        </b>
                    </router-link>
                    <span v-if="selected!=='_none'"> :: <small>{{ $route.meta.title }}</small></span>
                </h4>
                <select id="main-select" class="form-select" v-model="selected">
                    <option value="_none">choose an utility</option>
                    <template v-for="item in items" v-bind:key="item.name">
                        <option v-if="item.isGroup" disabled>{{ item.name }}</option>
                        <option v-else :value="item.routeName">{{ item.name }}</option>
                    </template>
                </select>
            </div>

            <div class="col-12">
                <hr/>
            </div>
        </template>

        <div v-if="selected === '_none'" id="main-list"
             class="col-12 d-flex flex-column justify-content-center align-items-center">
            <h2>
                <bootstrap-icon icon="tools" class="me-2"/>
                <span>y.k.'s utilities</span>
            </h2>
            <template v-for="item in items" v-bind:key="item.name">
                <h5 v-if="item.isGroup" class="mt-3 mb-2">
                    <b>{{ item.name }}</b>
                </h5>
                <p class="mb-2" v-else>
                    <router-link v-if="!item.isGroup" :to="{name: item.routeName}">
                        <span>{{ item.name }}</span>
                        <bootstrap-icon icon="chevron-double-right" class="ms-1"/>
                    </router-link>
                </p>
            </template>
        </div>

        <div class="col-12">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
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
                    result.push({name: route.meta.title, routeName: route.name})
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
            if (name === '_none') {
                this.$router.replace({name: 'home'})
            } else {
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

#main-list {
    padding-top: 12rem;
    min-height: 40rem;
    padding-bottom: 12rem;
}
</style>
