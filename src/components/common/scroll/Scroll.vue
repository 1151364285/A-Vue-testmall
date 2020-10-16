<template>
    <div class="warpper" ref="warpper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
      props:{
          probeType:{
            type:Number,
            default:0
          },
        pullUpLoad:{
            type:Boolean,
          default: false
        }
      },
      data(){
          return{
            scroll:null,
          }
      },
      mounted(){
        this.scroll = new BScroll(this.$refs.warpper,{
          click:true,
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad
        })

        /*监听滚动位置*/
        this.scroll.on('scroll',(position) => {
          //console.log(position);
          this.$emit('scroll', position)
        })
        /*监听上拉事件*/
        this.scroll.on('pullingUp',() =>{
          //console.log('上拉加载更多');
          this.$emit("pullingUp")
        })
      },
      methods:{
          scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
          },
            finishPullUp(){
              //console.log('---');
              this.scroll.finishPullUp()
            },
        getScrollY(){
          return this.scroll ? this.scroll.y : 0
        },
      }
    }
</script>

<style scoped>

</style>
