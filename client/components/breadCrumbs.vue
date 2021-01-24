<template>
  <nav :class="$style.wrap">
    <ol>
        <li
        v-for="(e,i) in list"
        :key="i"
        >
          <nuxt-link :to="e.link">{{e.name}}</nuxt-link>
        </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  }
}
</script>
<style lang="scss" module>
.wrap{
    & ol{
        display: flex;
        padding: 10px 0;
    }

    & li > a{
      color:color('black2');
      font-size:15px;
      border-bottom: 1px solid transparent;
      transition:.3s;
    }

    & li::before{
        content:'/';
        transform: scaleX(2);
        color:color('gray2');
        display: inline-block;
        margin:0 10px;
    }
    & li:hover > a{
      color:color()!important;
      border-bottom: 1px solid color();
    }
}
</style>
