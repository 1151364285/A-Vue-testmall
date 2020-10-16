<template>
    <div id = 'detail'>
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" @detailImageLoad="detailImageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <goods-list :goods="recommendeds" ref="recommend"></goods-list>
      </scroll>
      <detail-bottom-bar class="detail-bottom"></detail-bottom-bar>
      <back-top @click.native="backClick" v-show="isShowBackTop"
                @addCart="addToCart"
                class="back-top">
      </back-top>

    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailBavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"



  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";

  export default {
        name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        getRecommend,
        GoodsParam,
        Goods,
        GoodsList,
        Shop,
        Scroll,
        BackTop,
      },
      data(){
          return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            detailImages:{},
            paramInfo:{},
            commentInfo:{},
            recommendeds:[],
            itemImgListener:null,
            themeTopYs:[],
            getThemTopY:null,
            currentIndex:0,
            isShowBackTop:false,
          }
      },
      created(){
          this.iid = this.$route.params.iid
          getDetail(this.iid).then(res =>{
            const data = res.result;
            this.topImages = data.itemInfo.topImages

            //获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

            //创建店铺信息
            this.shop = new Shop(data.shopInfo)

            //保存商品详情数据
            this.detailInfo = data.detailInfo

            //获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            //获取评论信息
            if(data.rate.cRate !== 0){
              this.commentInfo = data.rate.list[0]
            }

            this.$nextTick(() =>{
              this.themeTopYs = []
              //根据最新的数据，对应DOM已经被渲染出来
              //但是图片依然是没有加载完(目前获取到的offsetTop不包含其中的图片)
              //offsetTOP不对，都是因为图片的问题
              /* this.themeTopYs = [];
              this.themeTopYs.push(0);
              this.themeTopYs.push(this.$refs.params.$el.offsetTop);
              this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
              this.themeTopYs.push(this.$refs.recommend.$el.offsetTop); */
            })
          })

        //获取推荐数据
        getRecommend().then(res =>{
          this.recommendeds = res.data.list
        })

        this.getThemTopY = debounce(() =>{
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop );
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop );
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop );

          //console.log(this.themeTopYs);
        },300)
      },
    methods:{
      imageLoad(){
        //this.$refs.scroll.refresh()
        this.getThemTopY()
      },
      detailImageLoad(){
        this.$refs.scroll.refresh()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 800);
      },
      contentScroll(position){
        //获取Y值
        const positionY = -position.y

        //positionY和主题值进行对比
        //[0,7938,9210,9454]
        //positionY在0和7938之间，index=0
        //positionY在7983和9210之间，index=1
        //positionY在9120和9452之间，index=2
        //positionY大于等于9120值，index=3
        let length=this.themeTopYs.length
        for(let i =0;i<length;i++){
          if(this.currentIndex!==i&&((i<length - 1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i===length-1 && positionY>=this.themeTopYs[i]))){
            this.currentIndex=i
            this.$refs.nav.currentIndex=this.currentIndex
          }

          //是否显示回到顶部
          this.isShowBackTop = (-position.y) > 1000
        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      addToCart() {
        window.alert("成功加入购物车");
        //获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //将商品添加到购物车
        //this.$store.commit('addCart', product)
        this.$store.dispatch("addCart", product);

      },
    },
    mounted(){


    },
    deactivated(){

    },
    }
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 9;
   background-color: white;
   height: 100vh;
 }
 .detail-nav{
   position: relative;
   z-index: 9;
   background-color: white;
 }
  .content{
    height: calc(100% - 44px - 49px);
  }
 .back-top {
   position: absolute;
   right: 8px;
   bottom: 55px;
 }
</style>
