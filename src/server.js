const express = require("express")
const cors = require("cors")
const studentsRoutes = require("./students")
const listEndpoints = require("express-list-endpoints")
const projectsRouter = require("./projects")
const problematicRoutes = require("./problematicRoutes")
const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} = require("./errorHandling")


const server = express()

const port =process.env.PORT || 3001

const loggerMiddleware = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`)
    next()
  }

server.use(cors())
server.use(express.json()) 
server.use("/students", studentsRoutes)
server.use("/projects", projectsRouter)
server.use("/problems", problematicRoutes)

// ERROR HANDLERS

server.use(notFoundHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)

console.log(listEndpoints(server))

server.listen(port, () => {
  console.log("Server is running on port: ", port)
})