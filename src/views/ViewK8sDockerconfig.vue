<script setup>
import {Codemirror} from "vue-codemirror";
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
                            <label for="input-registry" class="form-label">Registry</label>
                            <input type="text" class="form-control" id="input-registry" v-model="item.registry"/>
                        </div>
                        <div class="mb-3">
                            <label for="input-username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="input-username" v-model="item.username"/>
                        </div>
                        <div class="mb-3">
                            <label for="input-password" class="form-label">Password</label>
                            <input type="text" class="form-control" id="input-password" v-model="item.password"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-8 mt-3 mt-md-0">
            <div class="card">
                <div class="card-body">
                    <codemirror
                            :disabled="true"
                            :indent-with-tab="true"
                            :tab-size="2"
                            :model-value="output"
                    ></codemirror>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import YAML from "yaml";
import {Base64} from "js-base64";

export default {
    name: "ViewK8sDockerconfig",
    computed: {
        output() {
            const auths = {};
            auths[this.item.registry] = {
                "auth": Base64.encode(this.item.username + ":" + this.item.password)
            };
            const data = Base64.encode(JSON.stringify({auths}));
            const res = {
                apiVersion: "v1",
                kind: "Secret",
                metadata: {
                    name: this.item.name
                },
                type: "kubernetes.io/dockerconfigjson",
                data: {
                    ".dockerconfigjson": data
                }
            };
            if (this.item.namespace) {
                res.metadata.namespace = this.item.namespace;
            }
            return YAML.stringify(res);
        }
    },
    data() {
        return {
            useStringData: false,
            item: {
                name: "secret-name",
                namespace: "",
                registry: "registry.com",
                username: "username",
                password: "password"
            },
        };
    }
}
</script>

<style scoped>

</style>