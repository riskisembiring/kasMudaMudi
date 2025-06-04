import { db } from '../config/firebase-config.js';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  // CORS (simple handling)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    // Tentukan route berdasarkan URL, misal req.url
    if (req.url.endsWith('/login')) {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username dan password wajib diisi' });
      }

      try {
        const usersRef = collection(db, 'users');
        const q = query(
          usersRef,
          where('username', '==', username),
          where('password', '==', password)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          return res.status(401).json({ success: false, message: 'Username atau password salah' });
        }

        return res.status(200).json({ success: true, message: 'Login berhasil' });
      } catch (error) {
        return res.status(500).json({ success: false, message: 'Terjadi kesalahan saat login', error: error.message });
      }
    }

    if (req.url.endsWith('/register')) {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username dan password wajib diisi' });
      }

      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));
        const existing = await getDocs(q);

        if (!existing.empty) {
          return res.status(400).json({ success: false, message: 'Username sudah terdaftar' });
        }

        await addDoc(usersRef, { username, password });

        return res.status(201).json({ success: true, message: 'Registrasi berhasil' });
      } catch (error) {
        return res.status(500).json({ success: false, message: 'Terjadi kesalahan saat register', error: error.message });
      }
    }
  }

  res.setHeader('Allow', ['POST', 'OPTIONS']);
  res.status(405).end(`Method ${req.method} tidak diizinkan`);
}
