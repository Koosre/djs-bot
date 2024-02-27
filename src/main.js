import { Client, Events, GatewayIntentBits } from 'discord.js'
import vueInit from '../src/core/vue.js'
import dotenv from 'dotenv'

import {loadCommands} from '../src/core/loader.js'

loadCommands()

vueInit()
dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.TOKEN);