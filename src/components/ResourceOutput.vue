<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <button @click="doCopy" class="btn btn-primary">
                    <bootstrap-icon icon="clipboard" class="me-1"/>
                    <span>Copy</span>
                </button>
                <select id="select-format" class="form-select" v-model="format">
                    <option value="yaml">YAML</option>
                    <option value="json">JSON</option>
                </select>
            </div>
            <hr/>
            <div>
                <codemirror
                        ref="codemirror"
                        :disabled="true"
                        :indent-with-tab="true"
                        :tab-size="2"
                        :model-value="resourceString"
                ></codemirror>
            </div>
        </div>
    </div>

</template>

<script>
import YAML from "yaml";
import {Codemirror} from "vue-codemirror";
import copy from "copy-to-clipboard";

export default {
    name: "ResourceOutput",
    components: {Codemirror},
    props: ['resource'],
    mounted() {
        this.format = localStorage.getItem('default-resource-format') || 'yaml'
    },
    methods: {
        doCopy() {
            copy(this.resourceString, {
                message: 'Press #{key} to copy',
                onCopy: () => {
                    this.$toast.success('Copied to clipboard', {
                        position: 'bottom'
                    })
                }
            });
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