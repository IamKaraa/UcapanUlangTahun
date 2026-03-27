const songs = [
  {
    title: 'Lagu Pertama',
    file: 'assets/music/song1.mp3',
    description: 'Ini lagu yang wajib kita puter kalau lagi dijalan, lagu yang aku minta kamu untuk hapalin tapi kamu gapernah mau untuk hapalinnya karna kata kamu ini susah untuk di hapalin, dan lirik yang lalu kita nyanyiin bareng cuma dibagian " baby don`t cry " tapi entah kenapa aku selalu seneng ketika kita nyanyi berdua walaupun cuam di bagian ini.'
  },
  {
    title: 'Lagu Kedua',
    file: 'assets/music/song2.mp3',
    description: 'Kalau lagu ini aku masukin, karna kamu bilang kamu selalu puter lagu ini ketika aku magang kemarin, dan kamu bilang kota ini ga sama tanpa aku ya kannn. next jangan sampe ada ldr lagi yaa, kalau kita keluar kota, maka kita harus ke kota itu berdua.'
  },
  {
    title: 'Lagu Ketiga',
    file: 'assets/music/song3.mp3',
    description: 'Jujur aku gatau kenapa masukin lagu ini, karna gaada spesial nya selama ini, tapi yang aku inget, kamu pamerin aku lagu ini, padahal aku udah tau lagunya, dan aku tau kamu pasti denger lagu ini karna fomo lagi rame, tapi kamu gamau ngakuinnya yakannn...'
  }
];

const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');
const songDescription = document.getElementById('songDescription');
const nowPlaying = document.getElementById('nowPlaying');
const finishMusicBtn = document.getElementById('finishMusicBtn');

if (playlist && audioPlayer) {
  songs.forEach((song, index) => {
    const button = document.createElement('button');
    button.className = 'song-btn';
    button.textContent = `${index + 1}. ${song.title}`;

    button.addEventListener('click', () => {
      document.querySelectorAll('.song-btn').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      audioPlayer.src = song.file;
      audioPlayer.play();
      nowPlaying.textContent = `Sedang diputar: ${song.title}`;
      songDescription.textContent = song.description;
      finishMusicBtn.disabled = false;
    });

    playlist.appendChild(button);
  });

  finishMusicBtn.addEventListener('click', () => {
    unlockStep('quiz');
    window.location.href = '/hub.html';
  });
}