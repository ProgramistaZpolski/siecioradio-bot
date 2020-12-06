const Discord = require('discord.js');
const client = new Discord.Client();
const randomFile = require('select-random-file')

client.login('NzExNjAyOTk5NzYzNTMzODM2.XsGIZg.RHdSqFCGcdxV2Hf8t0O-nVGML8g');
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`siecioradio.begin() - by pzpl`);
});

client.on('message', async message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;
  
  console.log(message.content);
  if (message.author.id == "276427625847717889") {
  message.channel.send("<@276427625847717889>, kukanq to kasztan i kłamca!");
}
  if (message.content === 'siecioradio.begin()' && message.author.id !== "276427625847717889") {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      var smic;
      const dir = './audio'
      randomFile(dir, (err, file) => {
        console.log(`The random file is: ${file}.`)
        smic = file;
        message.reply("Rozpoczynam odtwarzanie " + smic + "! - siecioradio by pzpl")
        const dispatcher = connection.play('./audio/' + smic)
        dispatcher.on('finish', () => {
          message.reply("Zakończono odtwarzanie " + smic + "!")
          dispatcher.destroy(); // end the stream
        });
      })
    } else {
      message.reply('Nie podałeś kanału głosowego kasztanie');
    }
  }
  if (message.content === 'siecioradio.loop()') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      var smic;
      const dir = './audio'
      randomFile(dir, (err, file) => {
        console.log(`The random file is: ${file}.`)
        smic = file;
        const dispatcher = connection.play('./audio/' + smic)
        dispatcher.on('finish', () => {
          var smic;
          randomFile(dir, (err, file) => {
            console.log(`The random file is: ${file}.`)
            smic = file;
          })
          connection.play('./audio/' + smic)
        });
      })
    } else {
      message.reply('Nie podałeś kanału głosowego kasztanie');
    }
  }
});
