import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: "about" */ '../views/DemoView.vue')
  },
  {
    path: '/introductionview',
    name: 'introductionview',
    component: () => import(/* webpackChunkName: "about" */ '../views/IntroductionView.vue')
  },
  {
    path: '/introductionviewtwo',
    name: 'introductionviewtwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/IntroductionViewTwo.vue')
  },
  {
    path: '/introductionviewthree',
    name: 'introductionviewthree',
    component: () => import(/* webpackChunkName: "about" */ '../views/IntroductionViewThree.vue')
  },
  {
    path: '/introductionviewfour',
    name: 'introductionviewfour',
    component: () => import(/* webpackChunkName: "about" */ '../views/IntroductionViewFour.vue')
  },
  {
    path: '/introductionviewfive',
    name: 'introductionviewfive',
    component: () => import(/* webpackChunkName: "about" */ '../views/IntroductionViewFive.vue')
  },
  {
    path: '/introductionviewsix',
    name: 'introductionviewsix',
    component: () => import(/* webpackChunkName: "about" */ '../views/IntroductionViewSix.vue')
  },
  {
    path: '/coregraph',
    name: 'coregraph',
    component: () => import(/* webpackChunkName: "about" */ '../views/CoreGraph.vue')
  },
  {
    path: '/coregraphitem',
    name: 'coregraphitem',
    component: () => import(/* webpackChunkName: "about" */ '../views/CoreGraphItem.vue')
  },
  {
    path: '/coreshape',
    name: 'coreshape',
    component: () => import(/* webpackChunkName: "about" */ '../views/CoreShape.vue')
  },
  {
    path: '/corenode',
    name: 'corenode',
    component: () => import(/* webpackChunkName: "about" */ '../views/CoreNode.vue')
  },
  {
    path: '/coreedge',
    name: 'coreedge',
    component: () => import(/* webpackChunkName: "about" */ '../views/CoreEdge.vue')
  },
  {
    path: '/corecombo',
    name: 'corecombo',
    component: () => import(/* webpackChunkName: "about" */ '../views/CoreCombo.vue')
  },
  {
    path: '/corestyle',
    name: 'corestyle',
    component: () => import(/* webpackChunkName: "about" */ '../views/CoreStyle.vue')
  },
  {
    path: '/actionstyle',
    name: 'actionstyle',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActionStyle.vue')
  },
  {
    path: '/actionzindex',
    name: 'actionzindex',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActionZindex.vue')
  },
  {
    path: '/actionshowhide',
    name: 'actionshowhide',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActionShowHide.vue')
  },
  {
    path: '/actiontwopointmanyedge',
    name: 'actiontwopointmanyedge',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActionTwoPointManyEdge.vue')
  },
  {
    path: '/actionlockunlocknode',
    name: 'actionlockunlocknode',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActionLockUnlockNode.vue')
  },
  {
    path: '/forceone',
    name: 'forceone',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForceOne.vue')
  },
  {
    path: '/forcetwo',
    name: 'forcetwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForceTwo.vue')
  },
  {
    path: '/forcethree',
    name: 'forcethree',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForceThree.vue')
  },
  {
    path: '/forcefour',
    name: 'forcefour',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForceFour.vue')
  },
  {
    path: '/forcefive',
    name: 'forcefive',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForceFive.vue')
  },
  {
    path: '/forcesix',
    name: 'forcesix',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForceSix.vue')
  },
  {
    path: '/forceseven',
    name: 'forceseven',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForceSeven.vue')
  },
  {
    path: '/forceeight',
    name: 'forceeight',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForceEight.vue')
  },
  {
    path: '/forcenine',
    name: 'forcenine',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForceNine.vue')
  },
  {
    path: '/forceten',
    name: 'forceten',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForceTen.vue')
  },
  {
    path: '/forceeleven',
    name: 'forceeleven',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForceEleven.vue')
  },
  {
    path: '/dagreone',
    name: 'dagreone',
    component: () => import(/* webpackChunkName: "about" */ '../views/DagreOne.vue')
  },
  {
    path: '/dagretwo',
    name: 'dagretwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/DagreTwo.vue')
  },
  {
    path: '/dagrethree',
    name: 'dagrethree',
    component: () => import(/* webpackChunkName: "about" */ '../views/DagreThree.vue')
  },
  {
    path: '/dagrefour',
    name: 'dagrefour',
    component: () => import(/* webpackChunkName: "about" */ '../views/DagreFour.vue')
  },
  {
    path: '/dagrefive',
    name: 'dagrefive',
    component: () => import(/* webpackChunkName: "about" */ '../views/DagreFive.vue')
  },
  {
    path: '/fruchtermanone',
    name: 'fruchtermanone',
    component: () => import(/* webpackChunkName: "about" */ '../views/FruchtermanOne.vue')
  },
  {
    path: '/fruchtermantwo',
    name: 'fruchtermantwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/FruchtermanTwo.vue')
  },
  {
    path: '/fruchtermanthree',
    name: 'fruchtermanthree',
    component: () => import(/* webpackChunkName: "about" */ '../views/FruchtermanThree.vue')
  },
  {
    path: '/fruchtermanfour',
    name: 'fruchtermanfour',
    component: () => import(/* webpackChunkName: "about" */ '../views/FruchtermanFour.vue')
  },
  {
    path: '/fruchtermanfive',
    name: 'fruchtermanfive',
    component: () => import(/* webpackChunkName: "about" */ '../views/FruchtermanFive.vue')
  },
  {
    path: '/radialone',
    name: 'radialone',
    component: () => import(/* webpackChunkName: "about" */ '../views/RadialOne.vue')
  },
  {
    path: '/radialtwo',
    name: 'radialtwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/RadialTwo.vue')
  },
  {
    path: '/radialthree',
    name: 'radialthree',
    component: () => import(/* webpackChunkName: "about" */ '../views/RadialThree.vue')
  },
  {
    path: '/radialfour',
    name: 'radialfour',
    component: () => import(/* webpackChunkName: "about" */ '../views/RadialFour.vue')
  },
  {
    path: '/radialfive',
    name: 'radialfive',
    component: () => import(/* webpackChunkName: "about" */ '../views/RadialFive.vue')
  },
  {
    path: '/radialsix',
    name: 'radialsix',
    component: () => import(/* webpackChunkName: "about" */ '../views/RadialSix.vue')
  },
  {
    path: '/circularone',
    name: 'circularone',
    component: () => import(/* webpackChunkName: "about" */ '../views/CircularOne.vue')
  },
  {
    path: '/circulartwo',
    name: 'circulartwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/CircularTwo.vue')
  },
  {
    path: '/circularthree',
    name: 'circularthree',
    component: () => import(/* webpackChunkName: "about" */ '../views/CircularThree.vue')
  },
  {
    path: '/circularfour',
    name: 'circularfour',
    component: () => import(/* webpackChunkName: "about" */ '../views/CircularFour.vue')
  },
  {
    path: '/circularfive',
    name: 'circularfive',
    component: () => import(/* webpackChunkName: "about" */ '../views/CircularFive.vue')
  },
  {
    path: '/gridone',
    name: 'gridone',
    component: () => import(/* webpackChunkName: "about" */ '../views/GridOne.vue')
  },
  {
    path: '/gridtwo',
    name: 'gridtwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/GridTwo.vue')
  },
  {
    path: '/concentricone',
    name: 'concentricone',
    component: () => import(/* webpackChunkName: "about" */ '../views/ConcentricOne.vue')
  },
  {
    path: '/mdsone',
    name: 'mdsone',
    component: () => import(/* webpackChunkName: "about" */ '../views/MdsOne.vue')
  },
  {
    path: '/arcdiagramone',
    name: 'arcdiagramone',
    component: () => import(/* webpackChunkName: "about" */ '../views/ArcDiagramOne.vue')
  },
  {
    path: '/arcdiagramtwo',
    name: 'arcdiagramtwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ArcDiagramTwo.vue')
  },
  {
    path: '/comboone',
    name: 'comboone',
    component: () => import(/* webpackChunkName: "about" */ '../views/ComboOne.vue')
  },
  {
    path: '/combotwo',
    name: 'combotwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ComboTwo.vue')
  },
  {
    path: '/gpuone',
    name: 'gpuone',
    component: () => import(/* webpackChunkName: "about" */ '../views/GpuOne.vue')
  },
  {
    path: '/gputwo',
    name: 'gputow',
    component: () => import(/* webpackChunkName: "about" */ '../views/GpuTwo.vue')
  },
  {
    path: '/gputhree',
    name: 'gputhree',
    component: () => import(/* webpackChunkName: "about" */ '../views/GpuThree.vue')
  },
  {
    path: '/gpufour',
    name: 'gpufour',
    component: () => import(/* webpackChunkName: "about" */ '../views/GpuFour.vue')
  },
  {
    path: '/gpufive',
    name: 'gpufive',
    component: () => import(/* webpackChunkName: "about" */ '../views/GpuFive.vue')
  },
  {
    path: '/gpusix',
    name: 'gpusix',
    component: () => import(/* webpackChunkName: "about" */ '../views/GpuSix.vue')
  },
  {
    path: '/gpuseven',
    name: 'gpuseven',
    component: () => import(/* webpackChunkName: "about" */ '../views/GpuSeven.vue')
  },
  {
    path: '/gpueight',
    name: 'gpueight',
    component: () => import(/* webpackChunkName: "about" */ '../views/GpuEight.vue')
  },
  {
    path: '/layoutone',
    name: 'layoutone',
    component: () => import(/* webpackChunkName: "about" */ '../views/LayoutOne.vue')
  },
  {
    path: '/layouttwo',
    name: 'layouttwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/LayoutTwo.vue')
  },
  {
    path: '/layoutthree',
    name: 'layoutthree',
    component: () => import(/* webpackChunkName: "about" */ '../views/LayoutThree.vue')
  },
  {
    path: '/layoutfour',
    name: 'layoutfour',
    component: () => import(/* webpackChunkName: "about" */ '../views/LayoutFour.vue')
  },
  {
    path: '/layoutfive',
    name: 'layoutfive',
    component: () => import(/* webpackChunkName: "about" */ '../views/LayoutFive.vue')
  },
  {
    path: '/layoutsix',
    name: 'layoutsix',
    component: () => import(/* webpackChunkName: "about" */ '../views/LayoutSix.vue')
  },
  {
    path: '/layoutai',
    name: 'layoutai',
    component: () => import(/* webpackChunkName: "about" */ '../views/LayoutAi.vue')
  },
  {
    path: '/interactionandeventone',
    name: 'interactionandeventone',
    component: () => import(/* webpackChunkName: "about" */ '../views/InteractionAndEventOne.vue')
  },
  {
    path: '/interactionandeventtwo',
    name: 'interactionandeventtwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/InteractionAndEventTwo.vue')
  },
  {
    path: '/interactionandeventthree',
    name: 'interactionandeventthree',
    component: () => import(/* webpackChunkName: "about" */ '../views/InteractionAndEventThree.vue')
  },
  {
    path: '/interactionandeventfour',
    name: 'interactionandeventfour',
    component: () => import(/* webpackChunkName: "about" */ '../views/InteractionAndEventFour.vue')
  },
  {
    path: '/interactionandeventfive',
    name: 'interactionandeventfive',
    component: () => import(/* webpackChunkName: "about" */ '../views/InteractionAndEventFive.vue')
  },
  {
    path: '/animationshow',
    name: 'animationshow',
    component: () => import(/* webpackChunkName: "about" */ '../views/AnimationShow.vue')
  },
  {
    path: '/animationshowtwo',
    name: 'animationshowtwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/AnimationShowTwo.vue')
  },
  {
    path: '/pluginone',
    name: 'pluginone',
    component: () => import(/* webpackChunkName: "about" */ '../views/PluginOne.vue')
  },
  {
    path: '/plugintwo',
    name: 'plugintwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/PluginTwo.vue')
  },
  {
    path: '/pluginthree',
    name: 'pluginthree',
    component: () => import(/* webpackChunkName: "about" */ '../views/PluginThree.vue')
  },
  {
    path: '/pluginfour',
    name: 'pluginfour',
    component: () => import(/* webpackChunkName: "about" */ '../views/PluginFour.vue')
  },
  {
    path: '/pluginfive',
    name: 'pluginfive',
    component: () => import(/* webpackChunkName: "about" */ '../views/PluginFive.vue')
  },
  {
    path: '/pluginsix',
    name: 'pluginsix',
    component: () => import(/* webpackChunkName: "about" */ '../views/PluginSix.vue')
  },
  {
    path: '/pluginseven',
    name: 'pluginseven',
    component: () => import(/* webpackChunkName: "about" */ '../views/PluginSeven.vue')
  },
  {
    path: '/plugineight',
    name: 'plugineight',
    component: () => import(/* webpackChunkName: "about" */ '../views/PluginEight.vue')
  },
  {
    path: '/pluginnine',
    name: 'pluginnine',
    component: () => import(/* webpackChunkName: "about" */ '../views/PluginNine.vue')
  },
  {
    path: '/pluginten',
    name: 'pluginten',
    component: () => import(/* webpackChunkName: "about" */ '../views/PluginTen.vue')
  },
  {
    path: '/pluginten',
    name: 'pluginten',
    component: () => import(/* webpackChunkName: "about" */ '../views/PluginTen.vue')
  },
  {
    path: '/learnone',
    name: 'learnone',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnOne.vue')
  },
  {
    path: '/learntwo',
    name: 'learntwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnTwo.vue')
  },
  {
    path: '/learnthree',
    name: 'learnthree',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnThree.vue')
  },
  {
    path: '/learnfour',
    name: 'learnfour',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnFour.vue')
  },
  {
    path: '/learnfive',
    name: 'learnfive',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnFive.vue')
  },
  {
    path: '/learnsix',
    name: 'learnsix',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnSix.vue')
  },
  {
    path: '/learnseven',
    name: 'learnseven',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnSeven.vue')
  },
  {
    path: '/learneight',
    name: 'learneight',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnEight.vue')
  },
  {
    path: '/learnnine',
    name: 'learnnine',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnNine.vue')
  },
  {
    path: '/learnten',
    name: 'learnten',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnTen.vue')
  },
  {
    path: '/learneleven',
    name: 'learneleven',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnEleven.vue')
  },
  {
    path: '/learntweleve',
    name: 'learntweleve',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnTweleve.vue')
  },
  {
    path: '/learnthirteen',
    name: 'learnthirteen',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnThirteen.vue')
  },
  {
    path: '/learnfourteen',
    name: 'learnfourteen',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnFourteen.vue')
  },
  {
    path: '/learnfifteen',
    name: 'learnfifteen',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnFifteen.vue')
  },
  {
    path: '/learnsixteen',
    name: 'learnsixteen',
    component: () => import(/* webpackChunkName: "about" */ '../views/LearnSixteen.vue')
  },
  {
    path: '/startone',
    name: 'startone',
    component: () => import(/* webpackChunkName: "about" */ '../views/StartOne.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
