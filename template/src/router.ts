import Vue from 'vue'
import VueRouter, { Location, Route, RouteConfig } from 'vue-router'
import { makeHot, reload } from './util/hot-reload'
import { MainComponent } from './components/Main/MainComponent'

const mainComponent = () => import('./components/Main/MainComponent').then(({ MainComponent }) => MainComponent)

if (process.env.ENV === 'development' && module.hot) {
  const mainmoduleId = './components/helloworld/Helloworld'

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(mainmoduleId, mainComponent,
    module.hot.accept('./components/Main/MainComponent', () => reload(mainmoduleId, (require('./components/Main/MainComponent') as any).HomeComponent)))
}

Vue.use(VueRouter)

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: mainComponent
  }
]

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() })
