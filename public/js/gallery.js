const photoData = [
  {
    src: 'assets/photos/photo1.jpg',
    title: 'Pertama Kali Manggung',
    date: 'Kenangan Indah Tapi endingnya gasuka',
    description:
      'Waktu pertama kalinya kamu nemenin aku manggung beneran, walaupun endingnya banyak masalah, tapi aku seneng banget bisa di temenin waktu aku manggung.'
  },
  {
    src: 'assets/photos/photo2.jpg',
    title: 'Nonton konser bareng',
    date: 'Pertama kalinya kita nonton live konser bareng',
    description:
      'Pertama kalinya kita nonton live konser bareng walaupun kamu bete karna ga di ajak maju ke deket panggung tapi kenangan ini tetep ada dan seru banget.'
  },
  {
    src: 'assets/photos/photo3.jpg',
    title: 'Valentine',
    date: 'Valintine dengan style baru',
    description:
      'Kita ke time zone, main bowling, main basket, bombom car, capit boneka (aku jago makanya dapet), ketemu kawan aku lagi bucin juga, terus aku nyari game mobil yang aku suka tapi ga ada karna udah di ganti semua :(, tapi yang paling aku inget, aku selalu nanya ay style aku aneh ga, sampe kamu kesel sama aku hehehehehe.'
  },
  {
    src: 'assets/photos/photo4.jpg',
    title: 'Ke Kopi Kenangan',
    date: 'Mulai biasa sama stle 80s ini',
    description:
      'Kamu yang ngajakin aku bikin tiktok tapi aku gabisa dan kamu tetep maksa, ujungnya aku tetep kaku dan gabisa xixixi.'
  },
  {
    src: 'assets/photos/photo5.jpg',
    title: 'Bukber Berdua',
    date: 'Kita beruda mulai 80s',
    description:
      'gatau dah di foto ini aku kece banget intinya.'
  },
  {
    src: 'assets/photos/photo6.jpg',
    title: 'Ayang nyetir',
    date: 'Pulang kampus',
    description:
      'Kamu selalu pengen nyetir motor tiap pulang kampus karna kamu bilang nanti kaku karna jarang bawa, ujungnya nyetir deh.'
  }
];

const galleryGrid = document.getElementById('galleryGrid');
const photoDetailDesktop = document.getElementById('photoDetailDesktop');
const finishGalleryBtn = document.getElementById('finishGalleryBtn');

const MOBILE_BREAKPOINT = 900;
let viewedPhotos = new Set();
let activeIndex = null;

function isMobileView() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

function createPhotoCard(photo, index) {
  const button = document.createElement('button');
  button.className = 'photo-card';
  button.type = 'button';
  button.dataset.index = String(index);
  button.setAttribute('aria-expanded', 'false');
  button.innerHTML = `
    <img src="${photo.src}" alt="${photo.title}">
    <div class="photo-card-title">${photo.title}</div>
  `;
  return button;
}

function createDetailContent(photo) {
  return `
    <div class="badge">📸 ${photo.date}</div>
    <h3>${photo.title}</h3>
    <p class="page-text">${photo.description}</p>
  `;
}

function removeMobileDetails() {
  document.querySelectorAll('.mobile-photo-detail').forEach((element) => element.remove());
}

function clearActiveCards() {
  document.querySelectorAll('.photo-card').forEach((card) => {
    card.classList.remove('active');
    card.setAttribute('aria-expanded', 'false');
  });
}

function hideDesktopDetail() {
  if (!photoDetailDesktop) return;

  photoDetailDesktop.classList.add('hidden');
  photoDetailDesktop.classList.remove('show-side');
  photoDetailDesktop.innerHTML = '';
}

function hideDetail() {
  activeIndex = null;
  clearActiveCards();
  removeMobileDetails();
  hideDesktopDetail();
}

function showMobileDetail(photo, button) {
  const detail = document.createElement('div');
  detail.className = 'card mobile-photo-detail show-bottom';
  detail.innerHTML = createDetailContent(photo);
  button.insertAdjacentElement('afterend', detail);
}

function showDesktopDetail(photo) {
  if (!photoDetailDesktop) return;

  photoDetailDesktop.innerHTML = createDetailContent(photo);
  photoDetailDesktop.classList.remove('hidden');
  photoDetailDesktop.classList.add('show-side');
}

function showDetail(index, button) {
  const photo = photoData[index];

  hideDetail();
  activeIndex = index;

  button.classList.add('active');
  button.setAttribute('aria-expanded', 'true');

  if (isMobileView()) {
    showMobileDetail(photo, button);
  } else {
    showDesktopDetail(photo);
  }
}

function handlePhotoClick(index, button) {
  const clickedSamePhoto = activeIndex === index;

  if (clickedSamePhoto) {
    hideDetail();
    return;
  }

  viewedPhotos.add(index);
  showDetail(index, button);

  if (viewedPhotos.size > 0) {
    finishGalleryBtn.disabled = false;
  }
}

if (galleryGrid && photoDetailDesktop && finishGalleryBtn) {
  photoData.forEach((photo, index) => {
    const card = createPhotoCard(photo, index);

    card.addEventListener('click', (event) => {
      event.stopPropagation();
      handlePhotoClick(index, card);
    });

    galleryGrid.appendChild(card);
  });

  finishGalleryBtn.disabled = true;

  finishGalleryBtn.addEventListener('click', () => {
    unlockStep('music');
    window.location.href = '/hub.html';
  });

  document.addEventListener('click', (event) => {
    const clickedPhoto = event.target.closest('.photo-card');
    const clickedDesktopDetail = event.target.closest('#photoDetailDesktop');
    const clickedMobileDetail = event.target.closest('.mobile-photo-detail');

    if (!clickedPhoto && !clickedDesktopDetail && !clickedMobileDetail) {
      hideDetail();
    }
  });

  window.addEventListener('resize', () => {
    if (activeIndex === null) return;

    const activeButton = document.querySelector(`.photo-card[data-index="${activeIndex}"]`);
    if (!activeButton) return;

    showDetail(activeIndex, activeButton);
  });
}