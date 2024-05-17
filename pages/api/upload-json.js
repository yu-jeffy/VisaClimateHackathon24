// pages/api/upload-json.js
import { db } from '../../lib/firebase';
import fs from 'fs';
import path from 'path';
import { collection, doc, setDoc } from 'firebase/firestore';

export default async (req, res) => {
  if (req.method === 'POST') {
    const folderPath = path.join(process.cwd(), 'data'); // Update with your folder path

    try {
      const files = fs.readdirSync(folderPath);
      const uploadPromises = files.map(async (file) => {
        const filePath = path.join(folderPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);

        // Customize the collection and document name as per your requirements
        const collectionRef = collection(db, 'items');
        const docRef = doc(collectionRef, file.replace('.json', ''));
        await setDoc(docRef, jsonData);
      });

      await Promise.all(uploadPromises);
      res.status(200).json({ message: 'Files uploaded successfully' });
    } catch (error) {
      console.error('Error uploading files: ', error);
      res.status(500).json({ error: 'Error uploading files' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
