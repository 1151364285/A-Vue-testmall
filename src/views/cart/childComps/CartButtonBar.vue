<template>
    <div class="buttom-bar">
      <div class="check-content">
        <check-button :is-checked="isSelectAll"
                      class="check-button" @click.native="checkClick"
        ></check-button>
        <span>全选</span>
      </div>

      <div class="price">
        合计：￥{{totalPrice}}
      </div>
      <div class="calculate" @click="calcClick">
        去计算：({{checkLength}})
      </div>
    </div>
</template>

<script>
  import CheckButton from 'components/content/CheckButton/CheckButton'
    export default {
        name: "CartButtonBar",
      components:{
        CheckButton
      },
      computed:{
          totalPrice(){
            return this.$store.getters.cartList.filter(item =>{
              return item.checked
            }).reduce((preValue,item) =>{
              return preValue + item.price * item.count
            },0).toFixed(2)
      },
        checkLength(){
            return this.$store.getters.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
             //return !(this.$store.getters.cartList.filter(item => item.checked).length)
          if(this.$store.getters.cartList.length ===0){
            return false
          }else {
            return !this.$store.getters.cartList.find(item => !item.checked)
          }
          }
      },
      methods:{
        checkClick(){
          if(this.isSelectAll){ //全部选择
            this.$store.getters.cartList.forEach(item => item.checked = false)
          }else {
            this.$store.getters.cartList.forEach(item => item.checked = true)
          }
        },
        calcClick(){
          if(this.$store.getters.cartList.length ===0){
            this.$toast.show('请选择购买的商品',2000)
          }
        }
      }
    }
</script>

<style scoped>
  .buttom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;font-size: 14px;
  }

  .check-content{
    display: flex;
    align-items: center;
    margin-left: 15px;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 22px;
  }
  .price{
    flex: 1;
    margin-left: 5%;
  }
  .calculate{
    width: 90px;
    background-color: red;
    text-align: center;
  }
</style>
