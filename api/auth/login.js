// pages/api/login.js

import { db } from '../../config/firebase-config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username dan password wajib diisi'
    });
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
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login berhasil'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat login',
      error: error.message
    });
  }
}
