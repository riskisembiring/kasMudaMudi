import { db } from '../../config/firebase-config.js';
import { collection, addDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, amount, month, gereja } = req.body;

    if (!name || !amount || !month || !gereja) {
      return res.status(400).json({
        success: false,
        message: 'name, amount, month, dan gereja wajib diisi',
      });
    }

    try {
      const incomesRef = collection(db, 'incomes');
      await addDoc(incomesRef, { name, amount, month, gereja });

      return res.status(201).json({
        success: true,
        message: 'Data berhasil disimpan',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Gagal menyimpan data',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} tidak diizinkan`);
  }
}
