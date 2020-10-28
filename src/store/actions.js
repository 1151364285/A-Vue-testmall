
import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {
  addCart(context,payload){
    return new Promise((resolve , reject) =>{
      //1.查找之前数组中是否有商品
      let oidProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2.判断oidProduct
      if(oidProduct){
        //oidProduct.count +=1
        context.commit(ADD_COUNTER,oidProduct)
        resolve("当前商品数量+1")
      }else {
        payload.count = 1
        //context.state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve("添加新的商品")
      }
    })
  }
}
