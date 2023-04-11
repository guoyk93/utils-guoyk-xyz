import {createRouter, createWebHistory} from 'vue-router'
import ViewHome from '../views/ViewHome.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ViewHome
        },
        {
            path: '/kubernetes/dockerconfig',
            name: 'kubernetes_dockerconfig',
            component: () => import('@/views/ViewK8sDockerconfig.vue'),
            meta: {
                title: 'Kubernetes/Dockerconfig',
                group: 'Kubernetes',
                utils: true
            },
        },
        {
            path: '/kubernetes/files-to-config',
            name: 'kubernetes_files_to_config',
            component: () => import('@/views/ViewK8sFilesToConfig.vue'),
            meta: {
                title: 'Kubernetes/FilesToConfig',
                group: 'Kubernetes',
                utils: true,
            },
        },
    ]
})

export default router
