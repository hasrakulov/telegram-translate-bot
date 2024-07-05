const TelegramBot = require('node-telegram-bot-api');
const translate = require('translate-google');

// Telegram bot tokeni
const TELEGRAM_TOKEN = '6606994240:AAH0m2bhW3aje6gtlXte8dd7ayVk7-G6BZM'; // Bu yerda tokeningizni kiriting
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on('polling_error', (error) => {
  console.log(error);  // Polling errorlarni konsolga chiqarish
});

// /start komandasi
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Salom! So\'z yoki matn yuboring va men uni ingliz va rus tillariga tarjima qilaman.');
});

// Xabarlarni qayta ishlash
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Tarjimalar
  translate(text, { to: 'en' }).then(englishTranslation => {
    translate(text, { to: 'ru' }).then(russianTranslation => {
      const response = `
        Original: ${text}
        Inglizcha: ${englishTranslation}
        Ruscha: ${russianTranslation}
      `;

      bot.sendMessage(chatId, response);
    }).catch(err => {
      console.error('Rus tiliga tarjima qilishda xatolik:', err); // Xatolikni konsolga chiqarish
      bot.sendMessage(chatId, 'Rus tiliga tarjima qilishda xatolik yuz berdi.');
    });
  }).catch(err => {
    console.error('Ingliz tiliga tarjima qilishda xatolik:', err); // Xatolikni konsolga chiqarish
    bot.sendMessage(chatId, 'Ingliz tiliga tarjima qilishda xatolik yuz berdi.');
  });
});
