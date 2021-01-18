require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const Contact = require('./models/contacts')

const GalleryItem = require('./models/galleryItem');

// const contactsRoutes = require('./routes/contactsRoutes');

// DB Connection
mongoose
  .connect(process.env.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(process.env.PORT, () =>
      console.log(`http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));

// Express Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
// app.get('/', (req, res) => {
//   res.render('index');
// });

app.get('/', (req, res) => {
  // DB abrufen, auch diese ist asyncron => then / catch
  GalleryItem.find()
    .then((result) => {
      // res.send(result)
      res.render('index', { galleryData: result });
    })
    .catch((err) => console.log(err));
});

// app.get('/gallery', (req, res) => {
//   // DB abrufen, auch diese ist asyncron => then / catch
//   GalleryItem.find()
//     .then((result) => {
//       // res.send(result)
//       res.render('gallery', { galleryData: result });
//     })
//     .catch((err) => console.log(err));
// });

const addRoutes = require('./routes/addRoutes');
app.use('/add', addRoutes);

app.post('/add-pic', (req, res) => {
  // console.log(req.body);
  const newGalleryItem = new GalleryItem({
    title: req.body.title,
    brand: req.body.brand,
    price: req.body.price,
    img: req.body.img,
    link: req.body.link,
    spalten: req.body.spalten,
  });
  newGalleryItem
    .save()
    .then((result) => {
      // res.send(result)
      res.redirect('/');
    })
    .catch((err) => console.log(err));
});

// Der erste Parameter spezifiziert bei welchen URLS er schauen soll, der zweite in welcher Datei
// app.use('/contacts', contactsRoutes);
// Vorteil: Übersichtlicher
// und URL Struktur im Nachhinein einfacherer zu ändern
// const signupRoutes = require('./routes/signupRoutes');
// app.use('/signup', signupRoutes);

// MVC - Model View Controler
// eine Art euren Code und eure Dateien zu strukturieren
// Hilft den Code modularer, wiederverwendbarer und einfacher lesbar zu gestalten
// der Controller ist ein "Mittelsmann" zwischen dem Model und dem View

app.use((req, res) => {
  res.status(404).render('404');
});
