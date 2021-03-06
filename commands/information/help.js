const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const fs = require('fs')
const path = require('path')



module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with help menu!')
        .addStringOption(option => option.setName('commandname').setDescription('Enter command name')),

    async execute(interaction, client) {

let categories = [];
let commandInfo = new Map();

fs.readdirSync("./commands").forEach((dir) => {
    const commands = fs.readdirSync(`./commands/${dir}`).filter((file) => file.endsWith('js'))

    const cmds = commands.map((command) => {
        let file = require(`../../commands/${dir}/${command}`);

        let name = file.data.name

        commandInfo.set(file.data.name, file.data.description)
        return `\`${name}\``;
    })

    let data = new Object()

    data = {
        name: dir.toUpperCase(),
        value: cmds.length === 0 ? "No command" : cmds.join(' ')
    }

    categories.push(data)
})
  

        // check if there's any command passed
        let option = interaction.options.getString('commandname');
        if(!option || !commandInfo.get(option)) {
            const embed = new MessageEmbed()
            .setTitle(`Help`)
            .addFields(categories)
            .setColor('BLURPLE')
            .setFooter(`Use /help <command> to get detailed info about the command`);

            await interaction.reply({
                embeds: [embed]
            })    
        } else{
            const embed = new MessageEmbed()
                .addField(`/${option}`, `\`${commandInfo.get(option)}\``)
                .setColor("BLURPLE")
                .setFooter(`Command info for ${option}`);

                await interaction.reply({
                    embeds: [embed]
                }) 
        }
        
    }

}
