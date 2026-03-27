const blowBtn = document.getElementById('blowBtn');
const micBtn = document.getElementById('micBtn');
const nextBtn = document.getElementById('nextBtn');
const cakeStatus = document.getElementById('cakeStatus');
const flames = document.querySelectorAll('.flame');

let candleOut = false;

function extinguishCandles() {
  if (candleOut) return;

  candleOut = true;
  flames.forEach((flame) => flame.classList.add('off'));
  cakeStatus.textContent = 'Yeay, lilinnya berhasil dipadamkan ✨';
  nextBtn.classList.remove('hidden');
}

if (blowBtn) {
  blowBtn.addEventListener('click', extinguishCandles);
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    window.location.href = '/welcome.html';
  });
}

if (micBtn) {
  micBtn.addEventListener('click', async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      cakeStatus.textContent = 'Browser ini belum mendukung mikrofon. Pakai tombol Tiup Lilin ya 💨';
      return;
    }

    cakeStatus.textContent = 'Mikrofon aktif. Coba tiup ke arah mic 🎤';

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);

      source.connect(analyser);
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      let peakCount = 0;

      function detect() {
        if (candleOut) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;

        if (average > 50) {
          peakCount += 1;
        } else {
          peakCount = Math.max(0, peakCount - 1);
        }

        if (peakCount >= 8) {
          extinguishCandles();
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        requestAnimationFrame(detect);
      }

      detect();
    } catch (error) {
      cakeStatus.textContent = 'Izin mikrofon ditolak. Pakai tombol Tiup Lilin aja ya 💗';
    }
  });
}