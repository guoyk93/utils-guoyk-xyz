<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <select id="select-format" class="form-select" v-model="format">
                    <option value="yaml">YAML</option>
                    <option value="json">JSON</option>
                </select>
                <span></span>
            </div>
            <hr />
            <div>
                <codemirror ref="codemirror" :disabled="true" :indent-with-tab="true" :tab-size="2"
                    :model-value="resourceString"></codemirror>
            </div>
        </div>
    </div>
</template>

<script>
import YAML from "yaml";
import { Codemirror } from "vue-codemirror";
import copy from "copy-to-clipboard";

export default {
    name: "ResourceOutput",
    components: { Codemirror },
    props: ['resource'],
    mounted() {
        this.format = localStorage.getItem('default-resource-format') || 'yaml'
    },
    methods: {
        doCopy() {
            const success = copy(this.resourceString, {
                debug: true,
                message: 'Press #{key} to copy',
                type: 'text',
                onCopy: () => {
                    this.$toast.success('Copied to clipboard', {
                        position: 'bottom'
                    })
                }
            });
            console.log("Success: " + success)
        }
    },
    computed: {
        resourceString() {
            if (this.format === 'yaml') {
                return YAML.stringify(this.resource)
            } else {
                return JSON.stringify(this.resource, null, 2)
            }
        }
    },
    watch: {
        format(format) {
            localStorage.setItem('default-resource-format', format)
        }
    },
    data() {
        return {
            format: 'yaml',
        }
    }
}
</script>

<style scoped>
#select-format {
    width: 12rem;
}
</style>