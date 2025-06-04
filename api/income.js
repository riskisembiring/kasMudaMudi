import { db } from '../config/firebase-config.js'; // sesuaikan path jika di dalam /api/income/index.js
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const incomesRef = collection(db, 'incomes');
      const snapshot = await getDocs(incomesRef);
      const incomes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json(incomes);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === 'POST') {
    const { name, amount, month, gereja } = req.body;
    if (!name || !amount || !month || !gereja) {
      return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
    }
    try {
      const incomesRef = collection(db, 'incomes');
      await addDoc(incomesRef, { name, amount, month, gereja });
      return res.status(201).json({ success: true, message: 'Data berhasil disimpan' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, message: 'Parameter id wajib diisi' });
    try {
      const incomeDocRef = doc(db, 'incomes', id);
      await deleteDoc(incomeDocRef);
      return res.status(200).json({ success: true, message: 'Data berhasil dihapus' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'OPTIONS']);
  res.status(405).end(`Method ${req.method} tidak diizinkan`);
}
