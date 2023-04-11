<script setup>
import ResourceOutput from "@/components/ResourceOutput.vue";
</script>

<template>
    <div class="row">
        <div class="col-12 col-md-4">
            <div class="card">
                <div class="card-body">
                    <form>
                        <div class="mb-3">
                            <label for="input-name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="input-name" v-model="item.name"/>
                        </div>
                        <div class="mb-3">
                            <label for="input-namespace" class="form-label">Namespace</label>
                            <input type="text" class="form-control" id="input-namespace" v-model="item.namespace"/>
                        </div>
                        <div class="mb-3">
                            <label for="input-type" class="form-label">Type</label>
                            <select v-model="item.type" class="form-select" aria-label="input-type">
                                <option selected value="configmap">ConfigMap</option>
                                <option value="secret">Secret</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="input-files" class="form-label">Files</label>
                            <input @change="onFilesChanged" type="file" id="input-files" class="form-control"
                                   name="files"
                                   multiple/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-8 pt-3 pt-md-0">
            <ResourceOutput :resource="resource"/>
        </div>
    </div>

</template>

<script>
import {Base64} from "js-base64";

export default {
    name: "ViewK8sFilesToConfig",
    methods: {
        async onFilesChanged(elem) {
            const data = {};
            for (const file of elem.target.files) {
                const res = await new Promise(function (resolve, reject) {
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        resolve(event.target.result);
                    };
                    reader.onerror = function (e) {
                        reject(e);
                    };
                    reader.readAsBinaryString(file);
                });
                data[file.name] = Base64.encode(res);
            }
            this.item.data = data;
        }
    },
    computed: {
        resource() {
            let res = {};
            if (this.item.type === "configmap") {
                res = {
                    apiVersion: "v1",
                    kind: "ConfigMap",
                    metadata: {
                        name: this.item.name
                    },
                    binaryData: this.item.data
                };
            } else {
                res = {
                    apiVersion: "v1",
                    kind: "Secret",
                    metadata: {
                        name: this.item.name
                    },
                    type: "Opaque",
                    data: this.item.data
                };
            }
            if (this.item.namespace) {
                res.metadata.namespace = this.item.namespace;
            }
            return res
        }
    },
    data() {
        return {
            item: {
                name: "name",
                namespace: "",
                type: "configmap",
                data: {}
            },
        };
    }
}
</script>

<style scoped>

</style>