<template>
  <div :class="$style.wrap">
    <List :breadcrumbs="breadcrumbs" :posts="posts" />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
  watch,
  onBeforeMount,
  onMounted,
} from "@nuxtjs/composition-api";
import List from "~/components/list";

export default defineComponent({
  layout: "app",
  components: {
    List,
  },
  computed: {
    breadcrumbs() {
      return [
        {
          name: "TOP",
          link: "/",
        },
        {
          name: "タグ検索 #" + this.tag,
          link: "/tag/" + this.tag,
        },
      ];
    },
  },
  head() {
    const title = 'タグ検索 #' + this.tag + ' | ' + this.meta.title
    const description = this.meta.description
    return {
      title: title,
      script: this.jsonld(this.breadcrumbs),
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'keywords', name: 'keywords', content: this.meta.keywords },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:description', property: 'og:description', content: description },
      ],
    };
  },
  setup(props, context) {
    const { root, emit } = context;
    const { store, route, params, query, env, redirect } = root.context;
    const { state, commit, dispach } = store;
    const {
      $axios,
      $content,
      $router,
      $refs,
      $nuxt,
      $vuetify,
      $scrollTo,
      $dayjs,
      $set,
    } = root;
    /**
     * Define params and functions to use in DOM
     */
    const self = {
      env: env,
      meta: state.userMeta,
      posts: reactive([]),
      tag: params.hash,
    };

    onBeforeMount(() => {
      const posts = state.posts.filter((e, i) => {
        return e.tags.split(",").includes(self.tag);
      });
      $set(self.posts, posts);
    });

    onMounted(() => {});

    return self;
  },
});
</script>

<style lang="scss" module>
.wrap {}
</style>
