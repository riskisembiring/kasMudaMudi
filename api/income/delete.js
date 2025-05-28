import { db } from '../../config/firebase-config.js';
import { doc, deleteDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Bisa diganti sesuai origin web kamu
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Parameter id wajib diisi',
      });
    }

    try {
      const incomeDocRef = doc(db, 'incomes', id);
      await deleteDoc(incomeDocRef);
      return res.status(200).json({ success: true, message: 'Data berhasil dihapus' });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Gagal menghapus data',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} tidak diizinkan`);
  }
}
