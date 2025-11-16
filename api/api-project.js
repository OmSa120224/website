import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { name } = req.query; // e.g., /api/get-project?name=project5

  if (!name) {
    res.status(400).send('Missing project name');
    return;
  }

  const filePath = path.join(process.cwd(), 'files', `${name}.txt`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send('File not found');
    } else {
      res.status(200).send(data);
    }
  });
}
