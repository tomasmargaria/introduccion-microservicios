const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

const acciones = [
   { id: 1, name: 'maullar a tomas' },
   { id: 2, name: 'mirar fijo' },
   { id: 3, name: 'huir' },
   { id: 4, name: 'ladrar muy fuerte'},
   { id: 5, name: 'morder los talones' }
];

const mascotas = [
   {
       id: 1,
       type: 'perro',
       displayName: 'Caco',
       activities: [4, 5, 3],
       img: '',
       busy: false
   },
   {
       id: 2,
       type: 'gato',
       displayName: 'Betun',
       activities: [1, 3, 5],
       img: '',
       busy: false
   },
   {
       id: 3,
       type: 'gato',
       displayName: 'Dama',
       activities: [1, 2, 3],
       img: '',
       busy: false
   }
];

app.get('/mascotas', (req, res) => {
   console.log('Retornando Lista de Mascotas');
   res.send(mascotas);
});

app.get('/acciones', (req, res) => {
   console.log('Retornando Lista de Acciones');
   res.send(acciones);
});

app.post('/mascota/**', (req, res) => {
   const mascotaId = parseInt(req.params[0]);
   const mascota = mascotas.find(subject => subject.id === mascotaId);

   if (mascota) {
       for (let attribute in mascota) {
           if (req.body[attribute]) {
                mascota[attribute] = req.body[attribute];
               console.log(`Mascota ${mascotaId} asignada`);
           }
       }
       res.status(202).header({Location: `http://localhost:${port}/mascota/${mascota.id}`}).send(mascota);
   } else {
       console.log(`Mascota no encontrada.`);
       res.status(404).send();
   }
});

app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Servicio de mascotas escuchando en el puerto ${port}`);
app.listen(port);
