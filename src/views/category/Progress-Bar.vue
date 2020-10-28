<template>
  <div class="backg">
    测试使用...
    <div class="number">
      <p>+已缴纳{{num1}}户</p>
      <p>-未缴纳{{num2}}户</p>
    </div>
    <div class="mages">
      <div class="imge1">
        <p>{{num3}}</p>
      </div>
    <div class="imge2">
      <p>{{num4}}</p>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "category",
    data(){
      return{
        num1:679,
        num2:846,
        num3:'45%',
        num4:'55%'
      }
    }
  }
</script>

<style scoped>
  .backg{
    background-color: gainsboro;
    width: 600px;
    height: 200px;
    padding-top: 30px;
  }
  .number{
    display: flex;
  }
  .number p{
    font-size: 30px;
  }
  .number p:first-child{
    color: green;
    margin-left: 50px;
  }
  .number p:nth-child(2){
    color: red;
    margin-left: 135px;
  }
  .mages{
    display: flex;
  }
  .imge1{
    width: 355px;
    height: 80px;
    margin-left: 20px;
    background-color: green;
    border-radius: 45px 0 0 45px;
    line-height: 80px;
    background: linear-gradient(-45deg,transparent 55px,green 0 ) top left;

  }
  .imge1 p{
    color: white;
    font-size: 30px;
    margin-left: 30px;
  }
  .imge2{
    width: 400px;
    height: 80px;
    margin-left: 6px;
    background-color: red;
    border-radius:  0 45px 45px 0 ;
    margin-right: 20px;
    line-height: 80px;
    background: linear-gradient(135deg,transparent 55px,red 0) bottom right;
  }
  .imge2 p{
    color: white;
    font-size: 30px;
    float: right;
    margin-right: 20px;
  }
</style>
