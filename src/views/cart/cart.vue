<template>
    <div id="cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
        <cart-list></cart-list>
      <cart-button-bar></cart-button-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartButtonBar from './childComps/CartButtonBar'

  import Scroll from "components/common/scroll/Scroll";

  import {mapGetters} from 'vuex'

    export default {
        name: "cart",
      components:{
        NavBar,
        CartList,
        CartButtonBar,
        Scroll
      },
      computed:{
        ...mapGetters([
          'cartLength'
        ]),
      },
      activated(){
        //this.$refs.scroll.refresh()
      }
    }
</script>

<style scoped>
  #cart {
    height: 100vh;
    position: relative;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
    font-weight: 900;
  }



</style>
