import {defineStore} from 'pinia'

export const userAppStore = defineStore('app', {
    state: () => ({
        client: null,
        commandsActionMap: null,
    }),
    getters: {},
    actions: {},
  })