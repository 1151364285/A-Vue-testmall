<template>
    <div class="wrapper" >
      <ul class="content">
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li><li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li><li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li><li>分类列表</li><li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
      </ul>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'

    export default {
        name: "category",
      components:{

      },
      data(){
        return{
          scroll:null,
        }
      },
      mounted(){
           this.scroll = new BScroll(document.querySelector('.wrapper'),{
              probeType:3,
             pullUpLoad:true
          })

        this.scroll.on('pullUpLoad', () => {
          console.log('上拉加载更多');
        })
      }

    }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: red;
    /*overflow: hidden;*/
    /*overflow-y: scroll;*/


  }
</style>
