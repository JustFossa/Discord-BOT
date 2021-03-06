const {MessageEmbed} = require("discord.js")

module.exports.run = async(client, message) => {

	const mesg = await message.reply({content:'Pinging...'})

        const embed = new MessageEmbed()
                .setTitle("Pong!")
                .setDescription(`\`Client latency: ${mesg.createdTimestamp - message.createdTimestamp}ms \n Websocket latency: ${client.ws.ping}ms \``)
                .setTimestamp()
		
	mesg.edit({
		embeds: [embed]
	})
}

module.exports.help = {
	name: "ping",
	aliasses: ["p"],
	usages: "ping <test>"
}