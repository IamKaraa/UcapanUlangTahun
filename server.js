const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'birthday-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'lax'
    }
  })
);

app.use(express.static(path.join(__dirname, 'public')));

function requireAuth(req, res, next) {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  return res.redirect('/login.html');
}

app.get('/', (req, res) => {
  if (req.session && req.session.isAuthenticated) {
    return res.redirect('/cake.html');
  }
  return res.redirect('/login.html');
});

app.post('/login', (req, res) => {
  const { password } = req.body;

  if (password === process.env.BIRTHDAY_PASSWORD) {
    req.session.isAuthenticated = true;
    return res.json({ ok: true, redirectTo: '/cake.html' });
  }

  return res.status(401).json({ ok: false, message: 'Password salah, coba lagi ya 💌' });
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    return res.json({ ok: true });
  });
});

app.get('/session-check', (req, res) => {
  return res.json({ authenticated: !!(req.session && req.session.isAuthenticated) });
});

[
  'cake.html',
  'welcome.html',
  'hub.html',
  'wishes.html',
  'gallery.html',
  'music.html',
  'quiz.html',
  'closing.html'
].forEach((page) => {
  app.get(`/${page}`, requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', page));
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});