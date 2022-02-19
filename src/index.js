const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path')

const routes = require('./routes/task_routes')
const { mongoose } = require('./database')

// Settings
app.set('port', process.env.PORT || 8000);


// Middlewares
app.use(morgan('dev'));
app.use(express.json())

// Routes
app.use('/api/tasks',routes)


// Static files
app.use(express.static(path.join(__dirname, 'public')))

/* CONEXIÓN SERVER - PUERTO 8000 */
app.listen(app.get('port'), () => {
  console.log(`Servidor iniciado, puerto: ${app.get('port')}` )
})
