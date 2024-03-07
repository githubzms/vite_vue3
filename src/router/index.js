import { createRouter,createWebHashHistory } from "vue-router";

import Index from '../components/Helloworld.vue'
import Map from '../components/map.vue'
import Gzip from '../components/gzip.vue'
import Sse from '../components/sse.vue'
import Computed from '../components/computed.vue'
const routes=[
    {
        path:'/map',
        component:Map
    },
    {
        path:'/',
        component:Index
    },{
        path:'/zip',
        component:Gzip
    },{
        path:'/sse',
        component:Sse
    },{
        path:'/computed',
        component:Computed
        
    }
]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})
export default router