import Vue from 'vue'

export class UserAgent {
  constructor () {
      const agent = window.navigator.userAgent.toLowerCase();
      this.isMobile = agent.match(/(iphone|ipod|android.*mobile)/i)!==null;
      this.isTablet = agent.match(/(ipad|kindle)/i) || (agent.indexOf("android") !== -1 && agent.indexOf("mobile") === -1);
      this.isIE = agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1;
      this.isEdge = agent.indexOf("edge") !== -1;
      this.isChrome =agent.indexOf("chrome") !== -1;
      this.isFirefox = agent.indexOf("firefox") !== -1;
      this.isSafari = agent.indexOf("safari") !== -1 && agent.indexOf("chrome") === -1 && agent.indexOf("edge") === -1;
      this.isPC = !(this.isMobile || this.isTablet);
  }
}
Vue.prototype.$agent = new UserAgent()