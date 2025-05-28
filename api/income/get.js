import { db } from '../../config/firebase-config.js';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const incomesRef = collection(db, 'incomes');
      const snapshot = await getDocs(incomesRef);
      const incomes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).json(incomes);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil data',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} tidak diizinkan`);
  }
}
