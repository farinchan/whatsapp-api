const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const fs = require('fs');


// import routes
const Routes = require("./config/routes");
const { log } = require('console');

require("./config/database")

//dotenv (.env) config
dotenv.config()

const client = new Client({
    authStrategy: new LocalAuth()
});


console.log("Program Aktif");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// //routes middleware
app.use("/api", Routes)



client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR CODE IN');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.sendMessage("6289613390766@c.us", "Halo saya Adalah Terobik")

});

// KHUSUS UNTUK PRIVATE CHAT
client.on('message', async (message) => {

    let chat = await message.getChat()

    function pilihRandomItem(array) {
        if (array.length === 0) {
          return null; // Mengembalikan null jika array kosong
        }
      
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
      }

    if (chat.isGroup) {
        const keyword1 = 'halo terobik';
        const keyword2 = 'hai terobik';

        if (message.body.toLowerCase().includes(keyword1) || message.body.toLowerCase().includes(keyword2)) {
            // Mengirim balasan ke grup
            await client.sendMessage(message.from, 'Halo! Ada yang bisa saya bantu?');
        }
        if (message.body == '!tol') {
            message.reply('pong');
        }

        fs.readFile('./template_message/reply.json', 'utf8', (err, data) => {
            if (err) {
              console.error('Gagal membaca file:', err);
              message.reply("Gagal membaca file")
            }
          
            try {
              // Parse file JSON menjadi objek JavaScript
              const json = JSON.parse(data).intents;
              
              json.forEach((item) => {
                
                item.patterns.forEach(element => {
                    if (message.body.toLowerCase() == element.toLowerCase()) {
                        // Mengirim balasan ke grup
                        message.reply(pilihRandomItem(item.responses))
                    }
                });

              });
            } catch (err) {
              console.error('Gagal menguraikan file JSON:', err);
              message.reply("Gagal menguraikan file JSON")
            }
          });

    } else {
        if (message.body == '!ping') {
            message.reply('pong');
        }
    }

});


app.listen(3000, () => {
    console.log("Server is running on example http://localhost:3000");
});

client.initialize();

module.exports = client