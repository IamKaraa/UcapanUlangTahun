const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const errorText = document.getElementById('errorText');

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorText.textContent = '';

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.value.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal');
      }

      resetProgress();
      window.location.href = data.redirectTo;
    } catch (error) {
      errorText.textContent = error.message;
    }
  });
}