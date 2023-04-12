<template>
    <div class="row">
        <div class="col-12 col-md-4">
            <div class="card">
                <div class="card-body">
                    <form>
                        <div class="mb-3">
                            <label for="input-content" class="form-label">Name</label>
                            <textarea class="form-control" id="input-content" v-model="item.content" rows="128"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div id="main-content" class="col-12 col-md-8 mt-3 mt-md-0" v-html="contentHTML"></div>

    </div>
</template>

<script>
import {marked} from "marked";

export default {
    name: "ViewMarkdownRender",
    computed: {
        contentHTML() {
            return marked(this.item.content)
        }
    },
    data() {
        return {
            item: {
                content: "# Hello World"
            }
        }
    },
}
</script>

<style>
div#main-content {
    font-size: 1.2rem;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

div#main-content h1 {
    font-size: 2.0rem;
}

div#main-content h2 {
    font-size: 1.8rem;
}

div#main-content h3 {
    font-size: 1.6rem;
}

div#main-content h4 {
    font-size: 1.4rem;
}

div#main-content h5 {
    font-size: 1.2rem;
}

</style>