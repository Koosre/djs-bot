import {REST, Routes} from 'discord.js'
import fg from 'fast-glob'

const updateSlashCommands = async(commends) => {
    const rest = new REST({ version:10 }).setToken(process.env.TOKEN)
    const result = await rest.put(
        Routes.applicationGuildCommands(
            process.env.AppLication_ID,
            '529306099782778880'
        ),
        {
            body:commends,
        }
    ) 
    
    console.log(result)
}


export const loadCommands = async() => {

    const commends = []
    const files = await fg('./src/Commends/**/index.js')

    for(const file of files){
    const cmd = await import(file)
    commends.push(cmd.command)
    }

    await updateSlashCommands(commends)
}