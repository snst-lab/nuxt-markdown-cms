import Cookie from "js-cookie";

export const state = () => {}

export const mutations = {
    SET(state, {key,value}) {
        state[key] = value;
    }
};

export const actions = {
  /**
   * SSRモード時のみ
   * */
  async nuxtServerInit({ rootState, state, commit, dispatch }, { req }) {
  },
  /**
   * SSR/SPA/SSG共通
   * */
  async nuxtClientInit({ rootState, state, commit, dispatch  }, { req }) {
    await dispatch("csrAuth", process.env.CSR_AUTH_PASS);
  },
  /**
   * CSRでのパスワード認証（静的ホスティング用）
   */
  csrAuth({ rootState, state, commit, dispatch  }, password) {
    if (typeof password === "string" && password.length > 0) {
      document.body.style.display = "none";
      if (prompt("Input Password", "") === String(password)) {
        document.body.style.display = "block";
      } else {
        document.body.style.display = "block";
        document.body.innerHTML =
          "<b style='display:flex;align-items:center;justify-content:center;height:100vh;font-size:30px;padding:0 30px;'>[Error] Input valid password...</b>";
      }
    }
  },
};
