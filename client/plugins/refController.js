import Vue from 'vue'

export const set = (reactive, value) => {
    const keys = Object.keys(value)
    if(!!keys[0]){
        keys.some((key)=>{
            reactive[key] = value[key]
        })
    }else{
        reactive.value = value
    }
}

Vue.prototype.$set = set