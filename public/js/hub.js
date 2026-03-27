const menuMap = [
  { id: 'btnWishes', key: 'wishes', href: '/wishes.html' },
  { id: 'btnGallery', key: 'gallery', href: '/gallery.html' },
  { id: 'btnMusic', key: 'music', href: '/music.html' },
  { id: 'btnQuiz', key: 'quiz', href: '/quiz.html' },
  { id: 'btnClosing', key: 'closing', href: '/closing.html' }
];

const progress = getProgress();
const unlockedCount = Object.values(progress).filter(Boolean).length;
const progressText = document.getElementById('progressText');
const resetBtn = document.getElementById('resetJourneyBtn');
const logoutBtn = document.getElementById('logoutBtn');

if (progressText) {
  progressText.textContent = `${unlockedCount}/5 bagian terbuka`;
}

menuMap.forEach((item) => {
  const element = document.getElementById(item.id);
  if (!element) return;

  const lockIcon = element.querySelector('.lock-icon');

  if (progress[item.key]) {
    element.href = item.href;
    element.classList.remove('locked');
    element.removeAttribute('aria-disabled');

    if (lockIcon) {
      lockIcon.remove();
    }
  } else {
    element.href = '#';
    element.classList.add('locked');
    element.setAttribute('aria-disabled', 'true');

    if (!lockIcon) {
      const title = element.querySelector('strong');
      if (title) {
        title.insertAdjacentHTML('beforeend', ' <span class="lock-icon">🔒</span>');
      }
    }

    element.addEventListener('click', (event) => event.preventDefault());
  }
});

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    resetProgress();
    window.location.reload();
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await fetch('/logout', { method: 'POST' });
    localStorage.removeItem('birthday_progress_v1');
    window.location.href = '/login.html';
  });
}