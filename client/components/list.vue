<template>
  <div :class="$style.wrap">
    <Breadcrumbs :list="breadcrumbs" />
    <div :class="$style.inner">
      <Article
        :class="$style.article"
        v-for="(e, i) in posts"
        :key="i + e.slug"
        :post="e"
      />
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "~/components/breadCrumbs";
import Article from "~/components/article";

export default {
  props: {
    breadcrumbs: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    posts: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  components: {
    Breadcrumbs,
    Article,
  },
}
</script>

<style lang="scss" module>
.wrap {
  padding: 40px 40px !important;

  @include sm() {
    padding: 20px 0 !important;
  }
}
.inner {
  background-color: color("white1");
  width: 100%;
  padding: 40px;
  word-break: break-all;
  @include sm() {
    padding: 20px 4vw;
  }
  scroll-snap-type: y proximity;
}
.article {
  scroll-snap-align: start;
}
</style>
