require("dotenv").config();
const Discord = require("discord.js");
const Command = require("../../structures/Commandos.js");
const { MessageEmbed } = require("discord.js");

module.exports = class Skin extends Command {
  constructor(client) {
    super(client, {
      name: "skin",
      description: [
        "Shows a menu with the skins.",
        "Muestra un menú con las skins.",
      ],
      usage: ["<@user>", "<@usuario>"],
      args: true,
      category: "Utils",
      cooldown: 1,
      inactive: false,
    });
  }
  async run(client, message, args, prefix, lang, webhookClient, ipc) {
    try {
      let embed = new Discord.MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setTitle(`Skin de ${args[0]}`)
        .setImage(`https://mc-heads.net/player/${args[0]}`)
      return message.channel.send({embeds: [embed]});
    } catch (e) {
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
          .setColor(process.env.EMBED_COLOR)
          .setTitle(`Skin de ${args[0]}`)
          .setImage(`https://mc-heads.net/player/${args[0]}`)
        ]
      });
      webhookClient.send(
        `Ha habido un error en **${message.guild.name} [ID Server: ${message.guild.id}] [ID Usuario: ${message.author.id}] [Owner: ${message.guild.ownerId}]**. Numero de usuarios: **${message.guild.memberCount}**\nMensaje: ${message.content}\n\nError: ${e}\n\n**------------------------------------**`
      );
      try {
        message.author
          .send(
            "Oops... Ha ocurrido un eror con el comando ejecutado. Aunque ya he notificado a mis desarrolladores del problema, ¿te importaría ir a discord.gg/nodebot y dar más información?\n\nMuchísimas gracias rey <a:corazonmulticolor:836295982768586752>"
          )
          .catch(e);
      } catch (e) {}
    }
  }
};