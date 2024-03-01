import {REST, Routes, Collection} from 'discord.js'
import fg from 'fast-glob'
import { userAppStore } from '../store/app.js'

const updateSlashCommands = async(commends) => {
    const rest = new REST({ version:10 }).setToken(process.env.TOKEN)
    const result =await rest.put(
        Routes.applicationGuildCommands(
            process.env.Application_ID,
            '529306099782778880'
        ),
        {
            body:commends,
        },
    )  
    console.log(result) 
}


export const loadCommands = async() => {
    const appStore = userAppStore()
    const commands = []
    const actions = new Collection()
    const files = await fg('./src/Commends/**/index.js')

    for(const file of files){
    const cmd = await import(file)
    commands.push(cmd.command)
    actions.set(cmd.command.name, cmd.action)
    }

    await updateSlashCommands(commands)
    appStore.commandsActionMap = actions

    console.log(appStore.commandsActionMap)
}

export const loadEvents = async() => {
    const appStore = userAppStore()
    const client = appStore.client
    const files = await fg('./src/Events/**/index.js')
    for(const file of files){
        const eventF = await import(file)

        if(eventF.event.once){
        client.once(
            eventF.event.name,
            eventF.action)}
        else{
        client.on(
            eventF.event.name,
            eventF.action
        )
    }
    }
}