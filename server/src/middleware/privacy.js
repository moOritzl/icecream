export function stripIp(req, _res, next) {
  req.socket = req.socket ?? {};
  req.connection = req.socket;
  // Overwrite so Express never sees real IPs
  Object.defineProperty(req.socket, 'remoteAddress', { get: () => '0.0.0.0', configurable: true });
  delete req.headers['x-forwarded-for'];
  delete req.headers['x-real-ip'];
  delete req.headers['cf-connecting-ip'];
  next();
}

export function addPrivacyHeaders(_req, res, next) {
  res.removeHeader('X-Powered-By');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Permissions-Policy', 'interest-cohort=()');
  next();
}
