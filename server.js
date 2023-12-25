// server.js
const express = require('express');
const cors = require('cors');  // Importarea modulului CORS. CORS este o politică de securitate în browser care restricționează resursele care pot fi solicitate din alte domenii.
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); //middleware-ul CORS

// Configurare Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

// Definire model User
const User = require('./models/user');


// Middleware pentru a permite parsarea JSON în cereri POST
app.use(express.json());

// Ruta de înregistrare a utilizatorilor
app.post('/api/register', async (req, res) => {
  
  const { username, email, password } = req.body;
  console.log('arata aci ceva34');

  try {
    const newUser = await User.create({ username, email, password });
    console.log(username);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Eroare la înregistrarea utilizatorului:', error);
    res.status(500).json({ error: 'Eroare internă de server' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('ceaceacea');

  try {
    // Folosește Sequelize pentru a căuta un utilizator cu email-ul dat
    const user = await User.findOne({ where: { email } });

    if (user && user.password === password) {
      res.status(200).json({ success: true, message: 'Autentificare reușită!' });
    } else {
      res.status(401).json({ success: false, message: 'Autentificare eșuată. Verifică email-ul și parola.' });
    }
  } catch (error) {
    console.error('Eroare la autentificare:', error);
    res.status(500).json({ success: false, message: 'Eroare internă de server.' });
  }
});



// Backend routes
app.get('/api', (req, res) => {
  console.log('Backend is running!');
  res.send('Backend is running!');
  
});

// Frontend build
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Sincronizare Sequelize cu baza de date și pornire server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
