const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const customMdw         = require('./ayudantes/auth');
const multer = require('multer');//instalar multer
const path = require('path');

const app = express();

require('./database');
require('./config/passport');
//configuraciones
app.set('port', process.env.PORT|| 6500);
app.set('json spaces',2);
//middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json());
app.use(multer({dest: path.join(__dirname, 'public/img/temp')}).single('image'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(require('./rutas/fotos'));
app.use(require('./rutas/usuari'));
app.use(require('./rutas/biometrico'));


app.use(express.static(path.join(__dirname, 'public')));

app.use(customMdw.errorHandler);
app.use(customMdw.notFoundHandler)


//iniciar server
app.listen(app.get('port'),()=>{
    console.log('express corriendo en el puerto ',app.get('port'));
})