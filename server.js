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
const Project = require('./models/project');
const Bug = require('./models/Bug')



// Middleware pentru a permite parsarea JSON în cereri POST
app.use(express.json());


// Ruta de înregistrare a utilizatorilor
app.post('/api/register', async (req, res) => {
  
  const { username, email, password, tipUtilizator  } = req.body;
  console.log('arata aci ceva34');

  try {
    const newUser = await User.create({ username, email, password, tipUtilizator });
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
      res.status(200).json({ success: true, message: 'Autentificare reușită!', userType: user.tipUtilizator, userId: user.id  });
    } else {
      res.status(401).json({ success: false, message: 'Autentificare eșuată. Verifică email-ul și parola.' });
    }
  } catch (error) {
    console.error('Eroare la autentificare:', error);
    res.status(500).json({ success: false, message: 'Eroare internă de server.' });
  }
});

// Endpoint pentru a obține toata lista de utilizatori
app.get('/api/utilizatori', async (req, res) => {
  try {
    const utilizatori = await User.findAll();
    res.json(utilizatori);
  } catch (error) {
    console.error('Eroare la obținerea listei de utilizatori:', error);
    res.status(500).json({ error: 'Eroare la obținerea listei de utilizatori' });
  }
});

// Endpoint pentru a obține lista de proiecte in functe de id-ul userului logat - pt vizualizare ca MP
app.get(`/api/proiecteUtilizator/:id`, async (req, res) => {
  try {
    const userId = req.params.id;

    const { QueryTypes } = require('sequelize');
    const userProjects = await sequelize.query(
      `SELECT 
        p.*, 
        pu.UserId AS MembruEchipaUserId, 
        u1.username AS MembruEchipaUsername,
        pet.UserId AS TesterProiectUserId,
        u2.username AS TesterProiectUsername
      FROM Projects p
      LEFT JOIN ProjectUser pu ON p.id = pu.ProjectId
      LEFT JOIN Users u1 ON pu.UserId = u1.id
      LEFT JOIN ProiectEchipaTestare pet ON p.id = pet.ProjectId
      LEFT JOIN Users u2 ON pet.UserId = u2.id
      WHERE p.id IN (SELECT ProjectId FROM ProjectUser WHERE UserId = ${userId})`,
      { type: QueryTypes.SELECT }
    );

    res.json(userProjects);
  } catch (error) {
    console.error('Eroare la obținerea listei de proiecte:', error);
    res.status(500).json({ error: 'Eroare la obținerea listei de proiecte' });
  }
});

// Endpoint pentru a obține lista de proiecte in functe de id-ul userului logat - pt selectie cand adaugam un bug
app.get('/api/userProjects/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { QueryTypes } = require('sequelize');

    const userProjects = await sequelize.query(
      `SELECT p.* FROM Projects p
      LEFT JOIN ProjectUser pu ON p.id = pu.ProjectId
      LEFT JOIN ProiectEchipaTestare pet ON p.id = pet.ProjectId
      WHERE p.id IN (SELECT ProjectId FROM ProjectUser WHERE UserId = ${userId})
        OR p.id IN (SELECT ProjectId FROM ProiectEchipaTestare WHERE UserId = ${userId})`,
      { type: QueryTypes.SELECT }
    );

    res.json(userProjects);
  } catch (error) {
    console.error('Error getting user projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






// Endpoint pentru a obține lista de buguri in functe de id-ul userului logat
app.get('/api/bugs/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { QueryTypes } = require('sequelize');

    const bugs = await sequelize.query(
      `SELECT b.*, p.numeProiect
       FROM Bugs b
       INNER JOIN Projects p ON b.ProjectId = p.id
       WHERE b.ProjectId IN (
         SELECT pu.ProjectId FROM ProjectUser pu WHERE pu.UserId = ${userId}
         UNION
         SELECT pet.ProjectId FROM ProiectEchipaTestare pet WHERE pet.UserId = ${userId}
       )`,
      { type: QueryTypes.SELECT }
    );

    res.json(bugs);
  } catch (error) {
    console.error('Eroare la obținerea bug-urilor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});







// Endpoint pentru a adăuga un proiect
app.post('/api/proiecte', async (req, res) => {
  try {
    const { numeProiect, repository, echipaProiectului, echipaTestare, userId } = req.body;

    const echipaProiectActualizata = [...echipaProiectului];
    if (!echipaProiectActualizata.includes(userId)) {
      echipaProiectActualizata.push(userId);
    }

    // Creează proiectul în baza de date
    const proiect = await Project.create({
      numeProiect,
      repository,
      echipaProiectului:echipaProiectActualizata,
      echipaTestare

    });

    // Adaugă membrii în echipele respective (echipaProiectului și echipaTestare)
    // Poți utiliza asocierile Sequelize aici pentru a gestiona legăturile cu utilizatorii

    // Exemplu:

  
      await proiect.setEchipaProiectului(echipaProiectActualizata);
     await proiect.setEchipaTestare(echipaTestare);


    res.status(201).json({ proiect });
  } catch (error) {
    console.error('Eroare la adăugarea proiectului(4):', error);
    res.status(500).json({ error: 'Eroare la adăugarea proiectului(6)' });
  }
});

// Definirea unei rute pentru a obține toate proiectele
app.get('/api/proiecte', async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: 'EchipaProiectului',
          through: 'ProjectUser',
        },
        {
          model: User,
          as: 'EchipaTestare',
          through: 'ProiectEchipaTestare',
        },
      ],
    });
    res.json(projects);
  } catch (error) {
    console.error('Eroare la obținerea proiectelor:', error);
    res.status(500).json({ error: 'Eroare la obținerea proiectelor.' });
  }
});


app.post('/api/inscriereTestare', async (req, res) => {
  try {
    const { userId, projectId } = req.body;
    console.log(userId,projectId);

    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Proiectul nu există.' });
    }

    // Obțineți lista de utilizatori din echipa de testare a proiectului
    const usersInProject = await project.getEchipaTestare();
    console.log(usersInProject);
    // Verificați dacă utilizatorul este deja înscris în echipa de testare
    const userAlreadyInProject = usersInProject.some(user => user.id === userId);

    if (!userAlreadyInProject) {
      // Adăugați utilizatorul în echipa de testare a proiectului
      await project.addEchipaTestare(userId);
      res.status(200).json({ message: 'Utilizatorul a fost adăugat cu succes în echipa de testare.' });
    } else {
      res.status(409).json({ message: 'Utilizatorul este deja în echipa de testare.' });
    }
  } catch (error) {
    console.error('Eroare la înregistrarea utilizatorului în echipa de testare:', error);
    res.status(500).json({ error: 'Eroare la înregistrarea utilizatorului în echipa de testare.' });
  }
});




// Rută pentru înregistrarea unui bug
app.post('/api/bugs', async (req, res) => {
  try {
    // Despachiați datele primite de la client
    const { numeBug, severitate, prioritate, descriere, linkCommit, ProjectId } = req.body;

    // Verificați dacă proiectul există înainte de a adăuga bug-ul
    const project = await Project.findByPk(ProjectId);
    if (!project) {
      return res.status(404).json({ error: 'Proiectul nu există.' });
    }

    // Creați bug-ul în baza de date
    const newBug = await Bug.create({
      numeBug,
      severitate,
      prioritate,
      descriere,
      linkCommit,
      ProjectId,
    });

    res.status(201).json(newBug);
  } catch (error) {
    console.error('Eroare la înregistrarea bug-ului:', error);
    res.status(500).json({ error: 'Eroare la înregistrarea bug-ului.' });
  }
});

// Exemplu de rută pentru obținerea tuturor bug-urilor
app.get('/api/bugs', async (req, res) => {
  try {
    // Logică pentru a obține bug-urile din baza de date
    // Folosește Sequelize sau altceva pentru a accesa baza de date
    const bugs = await Bug.findAll({
      include: [{ model: Project }],
    });

    res.json(bugs);
  } catch (error) {
    console.error('Eroare la obținerea bug-urilor:', error);
    res.status(500).json({ error: 'Eroare la obținerea bug-urilor' });
  }
});



// Endpoint pentru alocarea bugului unui utilizator
app.put('/api/bugs/:bugId/allocate', async (req, res) => {
  const { bugId } = req.params;
  const { userId } = req.body;

  try {
    const bug = await Bug.findByPk(bugId);
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    if (bug.status === 'nerezolvat' && !bug.alocatUserului) {
      bug.alocatUserului = userId;
      bug.status = 'alocat';
      await bug.save();
      return res.status(200).json({ message: 'Bug allocated for resolution' });
    }

    return res.status(400).json({ message: 'Bug already allocated or resolved' });
  } catch (error) {
    console.error('Error allocating bug:', error);
    res.status(500).json({ error: 'Error allocating bug' });
  }
});

// Endpoint pentru marcarea bugului ca rezolvat și adăugarea link-ului de commit
app.put('/api/bugs/:bugId/resolve', async (req, res) => {
  const { bugId } = req.params;
  const { linkCommit, userId } = req.body;

  try {
    const bug = await Bug.findByPk(bugId);
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    if (bug.status === 'alocat' && bug.alocatUserului === parseInt(userId,10)) {
      bug.status = 'rezolvat';
      bug.linkCommit = linkCommit;
      await bug.save();
      return res.status(200).json({ message: 'Bug marked as resolved' });
    }

    return res.status(400).json({ message: 'Bug not allocated or not resolved by you' });
  } catch (error) {
    console.error('Error resolving bug:', error);
    res.status(500).json({ error: 'Error resolving bug' });
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
