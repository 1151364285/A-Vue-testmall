<template>
    <div class="tab-contorl">
      <div v-for="(item,index) in titles" :key="index" class="tab-contorl-item"
      :class="{active: index ===currentIndex}" @click="itemclick(index)"
      >
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
      props:{
          titles:{
            type:Array,
            default(){
              return[]
            }
          }
      },
      data(){
          return{
            currentIndex:0
          }
      },
      methods:{
        itemclick(index){
          this.currentIndex = index;
          this.$emit('tabClick',index)
        }
      }

    }
</script>

<style scoped>
  .tab-contorl{
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: white;
  }
  .tab-contorl-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-contorl-item span{
    padding: 5px;
  }
  .active{
    color:var(--color-high-text) ;

  }
.active span{
  border-bottom: 3px solid var(--color-high-text);
}
</style>
