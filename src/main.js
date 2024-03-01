import { Client, Events, GatewayIntentBits } from 'discord.js'
import vueInit from '../src/core/vue.js'
import dotenv from 'dotenv'
import {userAppStore} from '../src/store/app.js'

import {loadCommands, loadEvents} from '../src/core/loader.js'

vueInit()
dotenv.config()

loadCommands()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const appStore = userAppStore()
appStore.client = client

loadEvents()

client.login(process.env.TOKEN)