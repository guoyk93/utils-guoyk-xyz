import {createRouter, createWebHistory} from 'vue-router'
import ViewHome from '../views/ViewHome.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ViewHome,
            meta: {
                title: 'y.k.\'s utilities'
            }
        },
        {
            path: '/kubernetes/dockerconfig',
            name: 'kubernetes_dockerconfig',
            component: () => import('@/views/ViewK8sDockerconfig.vue'),
            meta: {
                title: 'kubernetes/dockerconfig',
                group: 'kubernetes',
                utils: true
            },
        },
        {
            path: '/kubernetes/files-to-config',
            name: 'kubernetes_files_to_config',
            component: () => import('@/views/ViewK8sFilesToConfig.vue'),
            meta: {
                title: 'kubernetes/filesToConfig',
                group: 'kubernetes',
                utils: true,
            },
        },
        {
            path: '/markdown/render',
            name: 'markdown_render',
            component: () => import('@/views/ViewMarkdownRender.vue'),
            meta: {
                title: 'markdown/render',
                group: 'markdown',
                utils: true,
            },
        },
        {
            path: '/shadow/decode-url',
            name: 'shadow_decode_url',
            component: () => import('@/views/ViewShadowDecodeURL.vue'),
            meta: {
                title: 'shadow/decodeUrl',
                group: 'shadow',
                utils: true,
            }
        }
    ]
})

export default router
