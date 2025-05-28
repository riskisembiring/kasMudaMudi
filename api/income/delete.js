import { db } from '../../config/firebase-config.js';
import { doc, deleteDoc } from 'firebase/firestore';

export default async function handler(req, res) {
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
