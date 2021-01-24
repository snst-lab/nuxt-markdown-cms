<template>
  <article :class="$style.wrap">
    <div :class="$style.anchor" :id="post.hash"></div>
    <v-row>
      <v-col cols="12">
        <div :class="$style.ttl">
          <h2>{{ post.slug }}</h2>
        </div>
        <ul :class="$style.tags">
          <li v-for="(e, i) in tags" :key="i">
            <nuxt-link :to="`/tag/${e}`">{{ e }}</nuxt-link>
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xl="6">
        <a :href="post.url" target="_blank" rel="noopener">
          <figure :class="$style.fig">
            <img
              :src="!!post.img ? `/img/user/${userMeta.id}/posts/${post.img}` : 'https://picsum.photos/240/160'"
              :alt="post.title"
            />
          </figure>
        </a>
      </v-col>
      <v-col cols="12" xl="6">
        <NuxtContent :class="$style.content" :document="post" />
      </v-col>
    </v-row>
  </article>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  watch,
  onBeforeMount,
  onMounted,
} from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: false,
    },
  },
  setup(props, context) {
    const { root, emit } = context;
    const { store, route, params, query, env, redirect } = root.context;
    const { state, commit, dispach } = store;
    const {
      $axios,
      $content,
      $scrollTo,
      $router,
      $refs,
      $nextTick,
      $nuxt,
      $vuetify,
      $dayjs,
      $set,
    } = root;
    /**
     * Define params and functions to use in DOM
     */
    const self = {
      env: env,
      userMeta: state.userMeta,
      tags: props.post.tags.split(","),
    };

    return self;
  },
});
</script>
<style lang="scss" module>
.wrap {
  padding: 0 0 300px;
  position: relative;
  @include sm() {
    padding: 0 0 100px;
  }
}
.anchor {
  position: absolute;
  top: -75px;
}
.fig {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px #bbb;

  > img {
    width: 100%;
    height: auto;
    transition: 1s;
    transform: scale(1.0);
  }

  &:hover > img {
    transform: scale(1.05);
  }

  &::before {
    content: "";
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: block;
    background: rgba(0, 0, 0, 0.5);
    pointer-events: none;
    opacity: 0;
    transition: 0.5s;
  }
  &::after {
    content: "VIEW MORE";
    border: 1px solid white;
    padding: 20px 40px;
    margin: auto;
    position: absolute;
    display: block;
    letter-spacing: 1px;
    z-index: 2;
    color: white;
    transform: scale(1.1);
    opacity: 0;
    transition: 0.5s;
  }

  &:hover:before,
  &:hover:after {
    opacity: 1;
    transform: scale(1);
  }
}
.ttl {
  font-size: 28px;
  letter-spacing: 1px;
  font-weight: bold;
  display: flex;
  color: #555;
  padding: 10px 0px 10px 25px;
  border-left: 15px solid color("smoke2");
  border-bottom: 1px solid color("smoke2");
  margin: 0 0 10px;
  @include sm() {
    padding: 10px 0px 10px 10px;
    font-size: 22px;
    letter-spacing: 0px;
  }
}
.tags {
  display: flex;
  padding: 5px 0 10px !important;
  & > li {
    margin-right: 1em;
  }
  & > li > a::before {
    content: "#";
  }
  & > li > a {
    color: color("gray1") !important;
    font-weight: 400;
    font-size: 15px;
    transition: 0.3s;
    border-bottom: 1px solid #fff;
  }
  & > li > a:hover {
    color: color() !important;
    border-bottom: 1px solid color();
  }
}
.content {
  table {
    width: 100%;
    & thead {
      display: none;
    }
    & tbody {
      width: 100%;
    }
    & tr {
      width: 100%;
      @include sm() {
        display: block;
      }
    }
    & tr:nth-of-type(2n-1) {
      background-color: #f8f8f8;
    }
    & td:nth-of-type(1) {
      font-weight: 700;
      min-width: 150px;
      padding: 1em;
      font-size: 15px;

      @include sm() {
        padding: 1em 1em 0.5em;
        display: block;
      }
    }
    & td:nth-of-type(2) {
      font-weight: 400;
      padding: 1em;
      color: color("black2");
      font-size: 15px;
      @include sm() {
        padding: 0.5em 1em 1em;
        display: block;
      }
    }
  }
}
</style>