// قاموس يربط الحروف العربية بالإشارات (صور وفيديوهات)
const signDictionary = {
    "أ": "images/أ.mp4",
    "ب": "images/ب.mp4",
    "ت": "images/ت.mp4",
    "ث": "images/ث.mp4",
    "ج": "images/ج.mp4",
    "ح": "images/ح.mp4",
    "خ": "images/خ.mp4",
    "د": "images/د.mp4",
    "ذ": "images/ذ.mp4",
    "ر": "images/ر.mp4",
    "ز": "images/ز.mp4",
    "س": "images/س.mp4",
    "ش": "images/ش.mp4",
    "ص": "images/ص.mp4",
    "ض": "images/ض.mp4",
    "ط": "images/ط.mp4",
    "ظ": "images/ظ.mp4",
    "ع": "images/ع.mp4",
    "غ": "images/غ.mp4",
    "ف": "images/ف.mp4",
    "ق": "images/ق.mp4",
    "ك": "images/ك.mp4",
    "ل": "images/ل.mp4",
    "م": "images/م.mp4",
    "ن": "images/ن.mp4",
    "هـ": "images/هـ.mp4",
    "و": "images/و.mp4",
    "ي": "images/ي.mp4",
    "1": "images/1.png",  
    "2": "images/2.png",
    "3": "images/3.png",
    "4": "images/4.png",
    "5": "images/5.png",
    "6": "images/6.png",
    "7": "images/7.png",
    "8": "images/8.png",
    "9": "images/9.png",
    "0": "images/0.png",
    "اَل": "images/أل.png",  
    "لا": "images/لا.png"  
};

// دالة لتحويل النص إلى لغة الإشارة
function convertToSignLanguage() {
    const inputText = document.getElementById('input-text').value;
    const container = document.getElementById('sign-language-container');
    container.innerHTML = ''; // مسح الإشارات السابقة

    let missingSigns = []; // لتخزين الحروف المفقودة

    // ترجمة النص إلى إشارات
    for (let i = 0; i < inputText.length; i++) {
        const char = inputText[i];
        const signMedia = signDictionary[char]; // احصل على مسار الإشارة

        if (signMedia) {
            // تحقق إذا كان الملف هو فيديو (ينتهي بـ .mp4)
            const signElement = document.createElement(signMedia.endsWith(".mp4") ? 'video' : 'img');
            signElement.src = signMedia;  // مسار الصورة أو الفيديو للإشارة

            // إذا كان الملف هو فيديو
            if (signMedia.endsWith(".mp4")) {
                signElement.controls = true;  // إضافة أزرار التحكم بالفيديو
                signElement.autoplay = true;  // تشغيل الفيديو تلقائيًا
                signElement.loop = true;      // تكرار الفيديو بشكل دائم
            }

            container.appendChild(signElement);  // إضافة الفيديو أو الصورة إلى الحاوية
        } else {
            missingSigns.push(char); // إضافة الحرف المفقود إلى القائمة
        }
    }

    // عرض إشعار إذا كان هناك حروف غير معروفة
    if (missingSigns.length > 0) {
        const alertMessage = `تم العثور على حروف أو رموز لا تدعمها لغة الإشارة: ${missingSigns.join(", ")}`;
        document.getElementById('missing-signs-alert').textContent = alertMessage;
    } else {
        document.getElementById('missing-signs-alert').textContent = ''; // إخفاء الإشعار إذا كانت جميع الحروف موجودة
    }

    // نطق النص باستخدام الترجمة الصوتية
    speakText(inputText);
}

// دالة لتحويل النص إلى صوت
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA"; // تعيين اللغة إلى العربية
    window.speechSynthesis.speak(utterance);
}
