import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import defaultHtml from '../view/default'

export default new Router({
    routes:[
        {
            path:'/',component:defaultHtml
        },
    ]
})