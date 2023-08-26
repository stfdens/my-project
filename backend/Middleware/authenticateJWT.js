const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const token = req.header('Authrorization');
  if (!token) {
    return res.status(401).json({ message: 'Tidak ada token, akses ditolak' });
  }

  jwt.verify(token.split(' ')[1], 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid, akses ditolak' });
    }

    // Disimpan di objek req sehingga dapat diakses oleh route lain
    req.userId = decoded.userId;
    next();
  });
}

module.exports = authenticateJWT;
