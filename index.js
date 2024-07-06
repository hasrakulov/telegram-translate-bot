const TelegramBot = require('node-telegram-bot-api');
const translate = require('translate-google');

const TELEGRAM_TOKEN = '6606994240:AAH0m2bhW3aje6gtlXte8dd7ayVk7-G6BZM';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on('polling_error', (error) => {
  console.log(error);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Salom bizning telegram botga xush kelibsiz! So\'z yoki matn yuboring va men uni ingliz va rus tillariga tarjima qilaman.');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  translate(text, { to: 'en' }).then(englishTranslation => {
    translate(text, { to: 'ru' }).then(russianTranslation => {
      const response = `
        Original: ${text}
        Inglizcha: ${englishTranslation}
        Ruscha: ${russianTranslation}
      `;

      bot.sendMessage(chatId, response);
    }).catch(err => {
      console.error('Rus tiliga tarjima qilishda xatolik:', err); 
      bot.sendMessage(chatId, 'Rus tiliga tarjima qilishda xatolik yuz berdi.');
    });
  }).catch(err => {
    console.error('Ingliz tiliga tarjima qilishda xatolik:', err);
    bot.sendMessage(chatId, 'Ingliz tiliga tarjima qilishda xatolik yuz berdi.');
  });
});
