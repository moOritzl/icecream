import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { stripIp, addPrivacyHeaders } from './middleware/privacy.js';
import submissionsRouter from './routes/submissions.js';
import adminRouter from './routes/admin.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT ?? 3001;
const isProd = process.env.NODE_ENV === 'production';

const app = express();

// ── Core middleware ───────────────────────────────────────────────────────────
app.use(stripIp);
app.use(addPrivacyHeaders);
app.use(express.json());

app.use(session({
  secret: process.env.SECRET_KEY ?? 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'strict',
    secure: isProd,
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
  },
}));

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api', submissionsRouter);
app.use('/api/admin', adminRouter);

// ── Serve SPA in production ───────────────────────────────────────────────────
if (isProd) {
  const distDir = join(__dirname, '../../client/dist');
  app.use(express.static(distDir));
  app.get('*', (_req, res) => res.sendFile(join(distDir, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
