const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});


console.log("Program Aktif");

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR CODE IN');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.sendMessage("6289613390766@c.us", "Halo saya Adalah Terobik")
    // client.getChats().then((value) =>
    //     console.log(value)
    //  );
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();