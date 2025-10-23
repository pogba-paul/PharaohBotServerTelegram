const TelegramBot = require('node-telegram-bot-api');

// ⚠️⚠️ ضع رمز البوت الخاص بك هنا (من BotFather) ⚠️⚠️
const token = 'YOUR_BOT_TOKEN_HERE'; 
// ⚠️⚠️ ضع آيدي قناتك هنا (على سبيل المثال: @PharaohNet أو -100123456789) ⚠️⚠️
const channelUsername = '@PharaohNetBot';
const channelLink = 'https://t.me/PharaohNetBot';
const bot = new TelegramBot(token, {polling: true});

// -----------------------------------------------------
// 1. معالج الأمر /start ورسالة الانضمام
// -----------------------------------------------------
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // الرسالة التي تطالب المستخدم بالانضمام
    const joinMessage = `مرحباً بك! 👋\nللوصول إلى القائمة، يجب عليك أولاً الانضمام إلى القناة.`;
    
    // إرسال الرسالة مع رابط القناة وزر للتحقق (كخطوة أولى)
    // 💡 ملاحظة: لا يمكن للـ Inline Keyboard أن يستدعي أمراً مثل /start مباشرة، لذا سنستخدم زر للتحقق
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'قم بالانضمام للقناة', url: channelLink }],
                [{ text: '✅ لقد انضممت، تحقق الآن', callback_data: 'check_join' }]
            ]
        }
    };

    bot.sendMessage(chatId, `${joinMessage}\n\n${channelLink}`, opts);
});

// -----------------------------------------------------
// 2. دالة إرسال القائمة الرئيسية (نفترض استدعائها بعد التحقق)
// -----------------------------------------------------
function sendMainMenu(chatId) {
    // بناء الأزرار الأربعة الرئيسية (Inline Keyboard)
    const keyboard = {
        inline_keyboard: [
            [{ text: 'INWI ☆6 SSH WS ', callback_data: 'server_inwi' }],
            [{ text: 'IAM 6 SSH WS ', callback_data: 'iam' }],
            [{ text: 'WIN 0DH UDP', callback_data: 'win_0dh' }],
            [{ text: 'UDP ZIVPN', callback_data: 'UDPZIV' }],=     
            [{ text: 'PROXIES AND PAYLOADS', callback_data: 'proxy_payload' }],
            [{ text: '🎬 طريقة تركيب السرفرات', url: 'https://www.facebook.com/61573924207577/videos/1045413713619371/?app=fbl'}]
        
        ]
    };

    bot.sendMessage(chatId, 'أهلاً بك! تفضل باختيار الخدمة:', { reply_markup: keyboard });
}

// -----------------------------------------------------
// 3. معالج استجابة الأزرار المضمنة (callback_query)
// -----------------------------------------------------
bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;
    const chatId = message.chat.id;
    const messageId = message.message_id;
    let responseText = '';

    // ⚠️⚠️ هذا هو الفراغ الذي يمكنك وضع فيه الرسالة لكل زر ⚠️⚠️
    switch (data) {
        case 'check_join':
    bot.getChatMember(channelUsername, callbackQuery.from.id)
.then((member) => {
            const status = member.status;

            if (status === 'member' || status === 'administrator' || status === 'creator') {
                // المستخدم منضم
                bot.answerCallbackQuery(callbackQuery.id, { text: 'تم التحقق من الانضمام ✅'});
                sendMainMenu(chatId); // إرسال القائمة الرئيسية
} else {
                // المستخدم غير منضم
                bot.answerCallbackQuery(callbackQuery.id, {
                    text: 'يبدو أنك لم تنضم بعد إلى القناة ❌',
                    show_alert: true
});
}
})
.catch((error) => {
            console.error('خطأ أثناء التحقق من العضوية:', error);
            bot.answerCallbackQuery(callbackQuery.id, {
                text: 'حدث خطأ أثناء التحقق. حاول مرة أخرى لاحقاً.',
                show_alert: true
});
});
    return;
            
        case 'server_inwi':
            responseText = `*SERVER ⚡️VPS INWI ☆6🔰*\n\n\`\`\`
vip.abrprem.com:80@shit:aw
\`\`\``;
    break;
        case 'iam':
            // ⚠️ الرسالة التي ترسل عند الضغط على 'iam *6'
            responseText = `*SERVEUR ⚡️VPS IAM ☆6🔰*\n\n\`\`\`
vip.abrprem.com:80@shit:aw
\`\`\``; 
            break;
        case 'win_0dh':
            // ⚠️ الرسالة التي ترسل عند الضغط على 'win 0dh'
            responseText = `*SERVEUR ⚡️VPS WIN 0DH🔰*\n\n\`\`\`
us.culturavpn.site:1-65535@masterthomas:team
\`\`\``; 
            break;
        case 'UDPZIV':
            // ⚠️ الرسالة التي ترسل عند الضغط على 'win 0dh'
            responseText = `*SERVEUR ⚡️VPS UDP ZIVPN🔰*\n\n\`\`\`
SERVER1
UDPSERVER: 139.99.196.223 UDPPASSWORD: xax0@ReriQo_
SERVER2
UDPSERVER: vip.elsonmelekh.us UDPPASSWORD: premium
SERVER3 
UDPSERVER: 102.129.137.108 UDPPASSWORD: che
SERVER4
UDPSERVER: 43.228.86.179 UDPPASSWORD: chitzi1411
SERVER5
UDPSERVER: us.culturavpn.site UDPPASSWORD: masterthomas
\`\`\``; 
            break;
        case 'proxy_payload':
            // ⚠️ الرسالة التي ترسل عند الضغط على 'proxy and payload'
            responseText = `*INWI PAYLOAD AND PROXY*\n\n\`\`\`
           PAYLOAD 
GET /cdn-cgi/trace HTTP/1.1[crlf]Host: help.twitter.com[crlf][crlf]CF-RAY / HTTP/1.1[crlf]Host: [Host][crlf]Upgrade: Websocket[crlf]Connection:https://t.me/pharaohnet Keep-Alive[crlf]User-Agent:https://t.me/pharaohnet [ua][crlf]Upgrade: websocket[crlf][crlf]

PROXY
help.twitter.com:8080
\`\`\`
*IAM PAYLOAD AND PROXY*\n\n\`\`\`
           PAYLOAD 
GET / HTTP/1.1[crlf]Host: [host][crlf]Connection:https://t.me/pharaohnet Upgrade[crlf]User-Agent:https://t.me/pharaohnet [ua][crlf]Upgrade: websocket[crlf][crlf]

PROXY
GET / HTTP/1.1[crlf]Host: [host][crlf]Connection:https://t.me/pharaohnet Upgrade[crlf]User-Agent:https://t.me/pharaohnet [ua][crlf]Upgrade: websocket[crlf][crlf]
\`\`\``; 
            break;
        default:
            responseText = 'حدث خطأ غير متوقع.';
    }

    // إرسال الرد في رسالة جديدة
    bot.sendMessage(chatId, responseText, { parse_mode: 'Markdown' });

    // إغلاق إشعار الزر (لإزالة علامة التحميل)
    bot.answerCallbackQuery(callbackQuery.id);
});