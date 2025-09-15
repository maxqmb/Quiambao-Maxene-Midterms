import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app = express();

// This part allows using __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable JSON parsing middleware
app.use(bodyParser.json());

// Serve static files from the "public" folder (for the Vue app)
app.use(express.static('public'));

// Serve the Vue app's static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// API Routes for POST request to submit data
app.post('/submitStudent', (req, res) => {
  const { studentID, firstName, lastName, section } = req.body;
  
  if (!studentID || !firstName || !lastName || !section) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  console.log("Student Form Submitted:", { studentID, firstName, lastName, section });

  res.json({ success: true, message: 'Student form submitted successfully!' });
});

app.post('/submitAdmin', (req, res) => {
  const { adminID, firstName, lastName, department } = req.body;

  if (!adminID || !firstName || !lastName || !department) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  console.log("Admin Form Submitted:", { adminID, firstName, lastName, department });

  res.json({ success: true, message: 'Admin form submitted successfully!' });
});

// Start the server
const server = app.listen(5000, () => {
  console.log(`Server running at http://localhost:5000`);
});
