import { defineStore } from 'pinia'
const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 100
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  },
  actions: {
    changeCountAction(newCount: number) {
      this.count = newCount
    }
  }
})
export default useCounterStore
