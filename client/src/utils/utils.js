import {MessageBox,Message} from 'element-ui'
export function confirm(text = '确定执行此操作吗？', type = 'warning') {
  return MessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type,
    center: true
  }).catch(err=>err)
}
export function message(res,...str){
  if(res.status != 200) return Message.error(str[0])
  Message.success(str[1])
}