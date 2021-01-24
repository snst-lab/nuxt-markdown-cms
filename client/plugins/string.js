import Vue from 'vue'

export class String {
  constructor() {
    this.password_base = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  uuid() {
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    let chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('')
    for (let i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
        case 'x':
          chars[i] = Math.floor(Math.random() * 16).toString(16).toUpperCase()
          break
        case 'y':
          chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16).toUpperCase()
          break
      }
    }
    return chars.join('')
  }
  rand(length = 16){
    return (new Date().getTime().toString(length)  + Math.floor(1000*Math.random()).toString(length)).toUpperCase()
  }
  password(length = 12){
    let password = '';
    for (let i = 0; i < length; i++) {
      password += this.password_base.charAt(Math.floor(Math.random() * this.password_base.length));
    }
    return password;
  }
}
Vue.prototype.$str = new String()