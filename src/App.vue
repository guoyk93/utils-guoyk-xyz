<script setup>
import {RouterView} from 'vue-router'
import BoxSelect from "@/components/BoxSelect.vue";
</script>

<template>
    <div class="row">
        <div class="col-12 pt-3 d-flex flex-row justify-content-between align-items-baseline">
            <router-link class="text-decoration-none" :to="{name:'home'}">
                <h4>
                    <bootstrap-icon icon="tools" class="me-2"/>
                    <span>Y.K.'s Utilities</span>
                </h4>
            </router-link>
            <BoxSelect/>
        </div>

        <div class="col-12">
            <hr/>
        </div>

        <div class="col-12">
            <router-view/>
        </div>
    </div>
</template>

<style scoped>
</style>
