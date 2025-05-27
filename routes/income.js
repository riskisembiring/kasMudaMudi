import express from 'express';
const router = express.Router();

import { db } from '../config/firebase-config.js';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc
} from 'firebase/firestore';

// Simpan data income
router.post('/save', async (req, res) => {
  const { name, amount, month, gereja } = req.body;

  if (!name || !amount || !month || !gereja) {
    return res.status(400).json({
      success: false,
      message: 'name, amount, month, dan gereja wajib diisi'
    });
  }

  try {
    const incomesRef = collection(db, 'incomes');
    await addDoc(incomesRef, { name, amount, month, gereja });

    res.status(201).json({
      success: true,
      message: 'Data berhasil disimpan'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menyimpan data',
      error: error.message
    });
  }
});

// Ambil semua data incomes
router.get('/get', async (req, res) => {
  try {
    const incomesRef = collection(db, 'incomes');
    const snapshot = await getDocs(incomesRef);
    const incomes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(incomes);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data',
      error: error.message
    });
  }
});

// Hapus income berdasarkan ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const incomeDocRef = doc(db, 'incomes', id);
    await deleteDoc(incomeDocRef);
    res.json({ success: true, message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus data',
      error: error.message
    });
  }
});

export default router;
