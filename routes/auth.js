import express from 'express';
const router = express.Router();

import { db } from '../config/firebase-config.js';  // jangan lupa tambahkan ekstensi `.js` jika perlu
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore';

// REGISTER
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username dan password wajib diisi'
    });
  }

  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const existing = await getDocs(q);

    if (!existing.empty) {
      return res.status(400).json({
        success: false,
        message: 'Username sudah terdaftar'
      });
    }

    await addDoc(usersRef, { username, password });

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat register',
      error: error.message
    });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
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

    res.json({
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
});

export default router;
