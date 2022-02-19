const express = require('express')
const router = express.Router()
const Task = require('../models/task_models')

/*
router.get('/', (peticion, respuesta) => {
  1 => Se presenta anidamiento de Callbacks - dificil manejo
  Task.find((err, tasks) => {
    console.log(tasks);
  })
  respuesta.json({
    status: 'API Works'
  })
  2 => Es mas util que la anterior pero no la mejor
  Task.find()
    .then(data => console.log(data))
    .catch(err=> console.log(err))
})
*/

router.get('/', async (peticion, respuesta) => {
  // 3 => Sintaxis - async - await (Forma mas factible)
  const tasks = await Task.find();
  respuesta.json(tasks)
  console.log(tasks)
})

router.get('/:id', async (peticion, respuesta) => {
  const task = await Task.findById(peticion.params.id);
  respuesta.json(task)
  console.log(task)
})

router.post('/', async (peticion, respuesta) => {
  const { title, description } = peticion.body;
  const task = new Task({title, description});
  await task.save(); // Guarda el dato en la DB mongoDB
  //console.log(task)
  respuesta.json({status: 'Task Saved'})
})

router.put('/:id', async (peticion, respuesta) => {
  const { title, description } = peticion.body;
  const newTask = {title, description};
  await Task.findByIdAndUpdate(peticion.params.id, newTask)
  //console.log(peticion.params.id)
  respuesta.json({status: 'Task Updated'})
})

router.delete('/:id', async (peticion, respuesta) => {
  await Task.findByIdAndRemove(peticion.params.id)
  respuesta.json({status: 'Task Deleted'})
})

module.exports = router;