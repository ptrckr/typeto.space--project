// Modules
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const app = express()

// Paths
const root = __dirname
const views_path = path.join(root, 'views')
const public_path = path.join(root, 'public')

// Settings
app.set('view engine', 'pug')
app.set('views', views_path)

// Middleware
app.use(express.static(public_path))
app.use(favicon(path.join(public_path, 'favicon.png')))

const levelData = [
  [[0, 0],[1, 0, 'S'],[2, 0, 't'],[3, 0, 'a'],[3, 1, 'r'],[4, 1, 't'],[5, 1]],
  [[0, 0],[1, 0, 'A'],[2, 0, 't'],[3, 0, 'a'],[3, 1, 'r'],[4, 1, 't'],[5, 1]],
  [[0, 0],[1, 0, 'B'],[2, 0, 't'],[3, 0, 'a'],[3, 1, 'r'],[4, 1, 't'],[5, 1]],
  [[0, 0],[1, 0, 'C'],[2, 0, 't'],[3, 0, 'a'],[3, 1, 'r'],[4, 1, 't'],[5, 1]]
]

// Routes
app.get('/typetospace/level/:id', (req, res, next) => {
  if (req.params.id in levelData) {
    res.json(levelData[req.params.id])
  } else {
    res.sendStatus(404)
  }
})

app.get('/typetospace', (req, res, next) => {
  res.render('index')
})

module.exports = {
  url: 'ptrckr.tokyo',
  app: app
}
