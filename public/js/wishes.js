const finishWishesBtn = document.getElementById('finishWishesBtn');

if (finishWishesBtn) {
  finishWishesBtn.addEventListener('click', () => {
    unlockStep('gallery');
    window.location.href = '/hub.html';
  });
}