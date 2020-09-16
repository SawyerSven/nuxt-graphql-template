// import { Loading as EleLoading } from 'element-ui'
import { isEmpty } from 'lodash'

const loading = {
  count: 0,
  loadingInstance: null,
  show () {
    this.count += 1
    if (this.count > 0 && isEmpty(this.loadingInstance)) {
      // eslint-disable-next-line
      console.log('display Loading')
      // this.loadingInstance = EleLoading.service({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)',
      // })
    }
  },
  hide () {
    if (this.count < 1) { return }
    this.count -= 1
    if (this.count === 0) {
      // eslint-disable-next-line
      console.log('close')
      // this.loadingInstance.close()
      // this.loadingInstance = null
    }
  }
}

export default loading
