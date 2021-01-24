<template>
  <v-app>
    <v-navigation-drawer
      :class="$style.drawerLeft"
      v-model="drawerLeft"
      fixed
      app
      width="300"
    >
      <v-treeview
        :class="$style.tree"
        v-model="tree"
        :open="userMeta.menu_tags.split(',')"
        :items="items"
        activatable
        item-key="title"
        open-on-click
      >
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="!item.icon">{{
            open ? "mdi-folder-open" : "mdi-folder"
          }}</v-icon>
          <v-icon v-else @click="scrollToHash('#' + item.link)">{{
            icons[item.icon]
          }}</v-icon>
        </template>
        <template v-slot:label="{ item }">
          <p v-if="!item.icon">{{ item.title }}</p>
          <p v-else @click="scrollToHash('#' + item.link)">{{ item.title }}</p>
        </template>
      </v-treeview>
    </v-navigation-drawer>

    <v-app-bar :class="$style.header" fixed app clipped-right>
      <v-btn icon @click.stop="drawerLeft = !drawerLeft">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-divider vertical :class="$style.headDivider" />
      <a href="/" target="_top" rel="noopener">
        <h1 :class="$style.headTitle"># {{ env.APP_NAME }}</h1>
      </a>
      <v-spacer />

      <v-btn icon @click.stop="drawerRight = !drawerRight">
        <v-icon v-if="drawerRight">mdi-menu-right-outline</v-icon>
        <v-icon v-else>mdi-menu-left-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main :class="$style.main">
      <Nuxt />
    </v-main>

    <v-navigation-drawer
      v-model="drawerRight"
      :class="$style.drawerRight"
      right
      clipped
      fixed
      app
      width="300"
    >
      <v-row :class="$style.profile">
        <v-col cols="5" :class="$style.avatar">
          <a :href="userMeta.avatar_link" target="_blank" rel="noopener">
            <figure>
              <img
                :src="`/img/user/${userMeta.id}/avatar.jpg`"
                alt="Profile photo"
              />
            </figure>
          </a>
        </v-col>
        <v-col cols="7" :class="$style.name">
          <em>{{ userMeta.name }}</em
          ><br />
          <small>{{ userMeta.name_en }}</small>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row :class="[$style.profile,$style.info]">
        <v-col cols="12">
          <NuxtContent :document="userMeta" />
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row :class="[$style.profile,$style.info]">
        <v-col
          cols="12"
          v-for="(e, i) in userMeta.list_tags_title.split(',')"
          :key="i"
        >
          <h2>{{ e }}</h2>
          <p :class="$style.tags">
              <nuxt-link v-for="(f, j) in userMeta['list_tags' + (i + 1)].split(',')"
              :key="j" :to="`/tag/${f}`">{{ f }}</nuxt-link>
          </p>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-footer :class="$style.footer" app fixed>
      <span
        >&copy; {{ new Date().getFullYear() }} &nbsp; {{userMeta.name_en}}
        &nbsp;&nbsp;All rights reserved</span
      >
    </v-footer>
  </v-app>
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
import Loader from "~/components/loader";
import Popup from "~/components/popup";
import crypto from "crypto-js";

export default defineComponent({
  components: {
    Loader,
    Popup,
  },
  async middleware({ app, store }) {
    const { $axios, $content } = app;
    store.commit("SET", { key: "userId", value: 1 });
    // fetch user meta
    const userMeta = await $content(`user/${store.state.userId}/meta`).fetch();
    // save to store
    store.commit("SET", { key: "userMeta", value: userMeta });
    // fetch posts
    let posts = await $content(`user/${store.state.userId}/posts`).fetch();
    // process posts
    posts = posts.filter((e,i) => !!e.public )
    posts.sort((a,b) => b.id - a.id)
    posts.some((e, i) => {
      e.hash = "x" + crypto.MD5(e.slug).toString();
    });
    // save to store
    store.commit("SET", { key: "posts", value: posts });
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
      drawerLeft: ref(true),
      drawerRight: ref(true),
      posts: reactive([]),
      tree: [],
      icons: {
        txt: "mdi-file-document-outline",
      },
      items: reactive([]),
      userMeta: state.userMeta,
      scrollToHash: (hash) => {
        if (!$vuetify.breakpoint.mdAndUp) {
          $set(self.drawerLeft, false);
          $set(self.drawerRight, false);
        }
        if (location.pathname === "/") {
          $scrollTo(hash, 500, { offset: 0 });
        } else {
          $router.push({ name: "index", hash: hash });
        }
      },
    };

    onBeforeMount(() => {
      /**
       * Hide drawer
       */
      if (!$vuetify.breakpoint.mdAndUp) {
        $set(self.drawerLeft, false);
        $set(self.drawerRight, false);
      }
      /**
       * Fetch post
       */
      $set(self.posts, state.posts);
      console.log(self.userMeta);
      /**
       * Fill treeview menu
       */
      const menuTags = self.userMeta.menu_tags.split(",")
      const items = []

      menuTags.some((e, i) => {
        items.push({
          title: e,
          children: [],
        });
        self.posts.some((f, j) => {
          if (f.tags.split(",").includes(e)) {
            items[i].children.push({
              link: f.hash,
              title: f.slug,
              icon: "txt",
            });
          }
        });
      });
      $set(self.items, items);
    });

    return self;
  },
});
</script>

<style lang="scss" module>
.headTitle {
  font-size: 20px;
  letter-spacing: 2px;
  padding: 0 50px;
  font-weight: 400;
  color: color("black2");
  @include sm() {
    padding: 0 20px;
  }
  transition: 0.3s;
  &:hover {
    color: color();
  }
}
.headDivider {
  padding: 0 30px;
  @include sm() {
    padding: 0 10px;
  }
}
.main {
  background-color: color("smoke2") !important;
}
.header {
  background-color: color("white1") !important;
  box-shadow: none !important;
  border-bottom: 1px solid color("smoke2") !important;
}
.drawerLeft {
  background-color: color("black1") !important;
}
.tree {
  padding: 10px;
  button {
    color: color("gray2") !important;
  }
  i {
    color: color("gray2") !important;
    padding-right: 5px;
  }
  p {
    padding: 20px 5px;
    margin: 0;
    color: white !important;
    @include clamp(1);
  }
}
.drawerRight {
  background-color: color("white1") !important;
  border: none !important;
}
.footer {
  background-color: color("black1") !important;
  div,
  span {
    display: block;
    margin-left: auto;
    margin-right: auto;
    font-size: 12px;
    font-weight: 400;
    color: #eee !important;
  }
}
.name {
  padding: 25px 0 0 5px;
}

.profile {
  padding: 10px 15px;
  width: 100%;
}

.info{
  & h2 {
    color: color("black3");
    font-size: 13px;
  }
  & p {
    color: color("black1");
    font-size: 15px;
    padding: 5px 10px;
  }
}
.avatar a {
  display: block;
  width: 75px !important;
  height: 75px !important;
  border-radius: 50%;
  text-align: center;
  background-image: linear-gradient(
    45deg,
    #ffa95f 5%,
    #f99c4a 15%,
    #f47838 30%,
    #e75157 45%,
    #d92d7a 70%,
    #cc2a92 80%,
    #c32e92 95%
  );
  transform: rotate(0deg);
  transition: cubic-bezier(1, 0, 0.1, 1.8) 1s;
}
.avatar a > figure {
  width: 75px !important;
  height: 75px !important;
  border-radius: 50%;
  transition: cubic-bezier(1, 0, 0.1, 1.8) 1s;
  transform: rotate(0deg) scale(0.82);
  overflow: hidden;
}
.avatar a:hover {
  transform: rotate(720deg);
}
.avatar a:hover > figure {
  transform: rotate(-720deg) scale(0.8);
}
.avatar a > figure > img {
  width: 100%;
}
.tags {
  display: inline-flex;
  flex-flow: row wrap;
  & > a{
    margin-right: 0.8em;
  }
  & > a::before {
    content: "#";
  }
  & > a {
    color: color("black1") !important;
    transition: 0.3s;
    border-bottom: 1px solid #fff;
  }
  & > a:hover {
    color: color() !important;
    border-bottom: 1px solid color();
  }
}
</style>

