# Introduccion a Microservicios en NodeJS

Repositorio creado para la charla "Microservicios en NodeJS" en las Jornadas Informáticas FACET 2020 – Día 24/10

Para clonar el repositorio 

```
$ git clone <url HTTPS o SSH del repositorio>
``` 

### Para correr los microservicios


En las carpeta /mascotas 
```
$ npm install
$ node mascota 8081 
``` 
 Corre el servicio en el localhost:8081
 
 
En las carpeta /situaciones 
```
$ npm install
$ node situaciones 8082 
``` 
 Corre el servicio en el localhost:8082
 
 
### Post de prueba en el servicio situaciones:

```
$ curl -i --request POST --header "Content-Type: application/json" --data '{"mascotaId": 2, "situacionId": 1}' localhost:8082/asignar
``` 
