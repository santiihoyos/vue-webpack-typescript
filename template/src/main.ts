import Vue from 'vue'
import VueRouter from 'vue-router'
import { makeHot, reload } from './util/hot-reload'
import { createRouter } from './router'
import { MainComponent } from './components/Main/MainComponent'
import './sass/main.scss'

const mainComponent = () => import('./components/Main/MainComponent').then(({ MainComponent }) => MainComponent)

if (process.env.ENV === 'development' && module.hot) {
  const mainModuleId = './components/Main/MainComponent'

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(mainModuleId, mainComponent,
    module.hot.accept(
      './components/Main/MainComponent',
      () => reload(mainModuleId, (require('./components/Main/MainComponent') as any).NavbarComponent))
    )
}

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app-main',
  router: createRouter(),
  components: {
    'main-component': mainComponent
  }
})
