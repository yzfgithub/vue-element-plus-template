import { Modal } from 'ant-design-vue'
/**
 * 确认提示框装饰器
 * @param {*} content 提示信息
 * @param {String} title 标题
 * @param {Function} cancelFn 取消回调函数
 */
export default (content, title = '提示', cancelFn = () => {}) => {
  return (target, name, descriptor) => {
    const originFn = descriptor.value
    descriptor.value = function (...args) {
      const msg = typeof content === 'object' ? this[content.method] : content
      const _this = this
      // return new Promise(resolve => {
      Modal.confirm({
        title,
        content: msg,
        centered: true,
        closable: true,
        class: 'confirm-modal',
        icon: h => {
          return h('a-icon', {
            props: {
              type: 'exclamation-circle',
              theme: 'filled'
            }
          })
        },
        onOk() {
          originFn.apply(_this, args)
          // .then(res => {
          //   if (res.success) {
          //     // resolve(true)
          //   }
          // })
        },
        onCancel() {
          cancelFn && cancelFn()
          // resolve(false)
        }
      })
      // })
    }
  }
}
