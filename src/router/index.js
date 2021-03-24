import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.PACK_NAME,
  routes: [

    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/index'],resolve),
      meta:{
      	title: "西瓜站",
      	keyword:"西瓜站",
      	description:"记事、记录解决方案、查询大家的解决方案"
      }
    },
    {
      path: '/menu',
      name: 'menu',
      component: resolve => require(['@/components/menu'],resolve)
    },
    {
      path: '/footer',
      name: 'footer',
      component: resolve => require(['@/components/footer'],resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/components/register'],resolve),
      meta:{
      	title: "注册-西瓜站",
      	keyword:"西瓜站,注册",
      	description:"记事、记录解决方案、查询大家解决方案"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'],resolve),
      meta:{
      	title: "登录-西瓜站",
      	keyword:"西瓜站,登录",
      	description:"记事、记录解决方案、查询大家解决方案"
      }
    },
    {
      path: '/diary',
      name: 'diary',
      component: resolve => require(['@/components/diary/index'],resolve),
      meta:{
      	title: "西瓜日志-西瓜站",
      	keyword:"西瓜站",
      	description:"1.梳理或记录每日任务,便于跟进任务,不会忘记;2.记住现在的心情,让生活留下痕迹,这将是未来最珍贵的财富;"
      }
    },
    {
      path: '/wear',
      name: 'wear',
      component: resolve => require(['@/components/wear/index'],resolve),
      meta:{
      	title: "天天搭-西瓜站",
      	keyword:"天天搭,T恤",
      	description:"关注“天天搭”，每天会搭多一点。"
      }//越简单的，越好看。一件纯色T恤搭是你衣柜里最明智的投资。
    },
    {
      path: '/solution',
      name: 'solution',
      component: resolve => require(['@/components/solution/index'],resolve),
      meta:{
      	title: "西瓜方案库-西瓜站",
      	keyword:"西瓜站",
      	description:"1.记住问题和问题的解决方案,便于以后处理相同问题;2.查找大家的解决方案;"
      }
    },
    {
      path: '/task',
      name: 'task',
      component: resolve => require(['@/components/task/task'],resolve),
      meta:{
      	title: "任务列表-西瓜站",
      	keyword:"西瓜站",
      	description:"记录任务，防止遗忘。按优先级提醒任务。"
      }
    },
    {
      path: '/category',
      name: 'category',
      component: resolve => require(['@/components/category/category'],resolve),
      meta:{
      	title: "小目标-西瓜站",
      	keyword:"西瓜站",
      	description:"目标分类，把控全局。"
      }
    },
  ]
})


router.beforeEach((to, from , next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
    let metaTags = document.getElementsByTagName('meta');
    metaTags[6].content = to.meta.keyword;
    metaTags[7].content = to.meta.description;
  }
  next();
})
export default router;