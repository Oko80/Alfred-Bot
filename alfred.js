const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "NDg5NzU2ODYxMDcyMTQ2NDUz.Dn6BNA.smR-_fVJYSC_SoawJg8hzdYLELI";
const PREFIX = "";
function play(connection, message) {
    
    
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    let resp =`__**Now Playing**__\n**${queue.songTitle}** -- **Requested By:** *${queue.requester}*\n\n__**Queue**__\n`;
    message.channel.send(resp);
    server.queue.shift();
    server.dispatcher.on("end", function(){
        if(server.queue[0]) play(connection, message);
       
        else connection.disconnect();
    });
    
}
var fortune = [ "Pubg",  "LOL", "LOL", "LOL", "LOL", "LOL", "LOL", "LOL", "Fifa", "Fifa","Fifa","2k","2k","2k","2k",
"Pubg","Pubg","Pubg","Pubg","Pubg", "Pubg", "LOL", "LOL", "GTAV", "MONOPOLY", "Fifa", "2k", "Overwatch", "Overwatch", "Overwatch", "Sg kumda"]
var bot = new Discord.Client();
var servers = {};
bot.on("ready", function(){
    console.log("Ready");
});
bot.on("message", function(message){

    if(message.author.equals(bot.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]) {
        case "ping":
            message.channel.send("Pong, sir.");
            break;
        case "kudur":
            message.channel.send("Çıldır");
            break;
        case "agla":
            message.channel.send("Delir");
            break;
        case "delir":
            message.channel.send("Zırla");
            break;
        case "gerçekleritarihyazar":
            message.channel.send("Tarihi de GALATASARAY");
            break;
        case "gercekleri tarih yazar":
            message.channel.send("Tarihi de GALATASARAY");
            break;
        case "fenerbahçe":
            message.channel.send("Whatever.");
            break;
        case "beşiktaş":
            message.channel.send("KARRTALİSCA");
            break;
        case "neoynasak":
            message.channel.send(fortune[Math.floor(Math.random()* fortune.length)]);
            message.channel.send(" oyna");
            break;
        case "sa":
            message.channel.send("as");
            break;
        case"play":
            if(!args[1]){
                message.channel.send("Please provide a link, sir.");
                return;
            }
            if(!message.member.voiceChannel){
                message.channel.send("You must be in a voice channel, sir");
                return;
            }
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            
            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection, message);
            });
            break;
        case "skip":
        var server = servers[message.guild.id];
        if(server.dispatcher) server.dispatcher.end();
        break;
        case "stop":
        var server = servers[message.guild.id];
        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;

    }


    
});

bot.login(TOKEN);