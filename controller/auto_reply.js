const client = require("../app")

// KHUSUS UNTUK PRIVATE CHAT
client.on('message', async (msg) => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

// KHUSUS UNTUK GRUP
client.on('group_message', async (message) => {
    // Menentukan kata kunci yang akan dipantau untuk memberikan balasan otomatis
    const keyword1 = 'halo terobik';
    const keyword2 = 'hai terobik';

    if (message.body.toLowerCase().includes(keyword1) || message.body.toLowerCase().includes(keyword2)) {
        // Mengirim balasan ke grup
        await client.sendMessage(message.from, 'Halo! Ada yang bisa saya bantu?');
    }
});