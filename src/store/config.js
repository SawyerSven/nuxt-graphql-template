import parser from 'ua-parser-js'

export const state = () => ({
  width: null,
  height: null,
  ua: null
})

export const getters = {
  ua (state, getters, rootState, rootGetters) {
    return state.ua
  },
  uaResult (state, getters) {
    return parser(getters.ua)
  },
  width (state) {
    return state.width
  },
  height (state) {
    return state.height
  },
  device (state, getters, rootState) {
    if (getters.width) {
      if (getters.width > rootState.padWidth) {
        return 'desktop'
      } else if (getters.width > rootState.mobileWidth) {
        return 'pad'
      } else {
        return 'mobile'
      }
    } else {
      const type = getters.uaResult.device.type
      if (type === 'tablet') {
        return 'pad'
      } else if (type === 'mobile') {
        return 'mobile'
      } else {
        return 'desktop'
      }
    }
  }
}

export const actions = {}

export const mutations = {
  setWidth (state, width) {
    state.width = width
  },
  setHeight (state, height) {
    state.height = height
  },
  setUa (state, ua) {
    state.ua = ua
  }
}
