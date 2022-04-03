import express from 'express'
import { Application } from 'express'
import githubRoute from './routes/github.route'

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(5000, () => {
  console.log('server is listening on port 5000')
})

app.use('/github', githubRoute)
