const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

const port = process.argv.slice(2)[0];
const app = express();

app.use(bodyParser.json());

const mascotasService = 'http://localhost:8081';

const situaciones = [
   {
       id: 1,
       displayName: 'Tomas esta durmiendo profundamente en su cama.',
       necessaryActions: ['maullar a tomas', 'ladrar muy fuerte', 'morder los talones', 'mirar fijo'],
       img: '',
       assignedPet: 0
   },
   {
       id: 2,
       displayName: 'Hay un ruido fuerte en la casa',
       necessaryActions: ['huir', 'ladrar muy fuerte'],
       img: '',
       assignedPet: 0
   },
   {
       id: 3,
       displayName: 'Tomas se cae al piso',
       necessaryActions: ['huir', 'mirar fijo'],
       img: '',
       assignedPet: 0
   }
];

app.get('/situaciones', (req, res) => {
   console.log('Retornando Lista de Situaciones');
   res.send(situaciones);
});

app.post('/asignar', (req, res) => {
   request.post({
       headers: {'content-type': 'application/json'},
       url: `${mascotasService}/mascota/${req.body.mascotaId}`,
       body: `{
           "busy": true
       }`
   }, (err, heroResponse, body) => {
       if (!err) {
           console.log(req.body);
           const situacionId = parseInt(req.body.situacionId);
           const situacion = situaciones.find(subject => subject.id === situacionId);
           situacion.assignedPet = req.body.mascotaId;
           res.status(202).send(situacion);
       } else {
           res.status(400).send({problem: `Servicio de Mascotas repondio con un error: ${err}`});
       }
   });
});

app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Servicio de situaciones escuchando en el puerto ${port}`);
app.listen(port);
