<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center"> 购物街 </div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
                 ref="tabControl1"  class="tab-control" v-show="isTabFixed"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentScroll" :pull-up-load="true"  @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
                   ref="tabControl2" ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import TabControl from 'components/content/tabControl/TabControl'
  import NavBar from 'components/common/navbar/NavBar'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {
    getHomeMultidata,
    getHomeGoods,
  } from "network/home";
  //import Swiper from 'components/common/swiper/Swiper'

  export default {
        name: "home",
      components:{
          NavBar,
          HomeSwiper,
          RecommendView,
          FeatureView,
          TabControl,
          GoodsList,
          Scroll,
          BackTop
      },
    data(){
          return{
            banners:[],
            recommends:[],
            goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]},
            },
            currentType:'pop',
            isShowBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0,
            ItemImgListener:null,
          }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
      created() {
        //1.请求多个数据
        this.getHomeMultidata()

        //2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      },
    mounted(){
      // const  refresh = this.debounce(this.$refs.scroll.scroll.refresh,300)
      // this.$bus.$on('getHomeGoods',() =>{
      //   refresh()
      // })
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

    },
    activated(){

          this.$refs.scroll.scrollTo(0,this.saveY)

    },
    deactivated(){
          this.saveY = this.$refs.scroll.getScrollY()

          //取消全局事件的监听
      //this.$bus.$off('itemImageLoad',this.ItemImgListener)
    },
    methods:{
          // debounce(func,delay){
          //   let timer = null
          //   return function (...args) {
          //     if(timer) clearTimeout(timer)
          //     timer = setTimeout(()=>{
          //       func.apply(this,args)
          //     },delay)
          //   }
          // },

          /*事件监听*/
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
                break
          case 1:
            this.currentType='new'
                break
          case 2:
            this.currentType='sell'
                break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      } ,
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        //console.log(position)
        this.isShowBackTop = (-position.y) > 1000

        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        //console.log('shangla');
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

          /*网络请求*/
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          //this.result=res;
          this.banners = res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page +=1
          this.$refs.scroll.finishPullUp()
        })
      }
      }
    }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  /*.fixed{*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 44px;*/
  /*}*/
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top:0 ;*/
    /*z-index: 9;*/
  }

  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /*.content{*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/

  /*}*/
</style>
