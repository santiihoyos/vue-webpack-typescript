import { Component, Vue } from 'vue-property-decorator'

import './MainComponent.scss'

@Component({
  template: require('./MainComponent.html')
})
export class MainComponent extends Vue {
  msg: string = 'This works!'

  onButtonClick () {
    alert(this.msg)
  }
}

export * from './MainComponent'
