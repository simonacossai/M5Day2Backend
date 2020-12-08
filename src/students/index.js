const express = require("express") 
const fs = require("fs") 
const path = require("path") 
const uniqid = require("uniqid") 

const router = express.Router()


router.get("/", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json")
  const fileAsABuffer = fs.readFileSync(studentsFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const studentsArray = JSON.parse(fileAsAString)
  res.send(studentsArray)
})


router.get("/:identifier", (req, res) => {

  const studentsFilePath = path.join(__dirname, "students.json")
  const fileAsABuffer = fs.readFileSync(studentsFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const studentsArray = JSON.parse(fileAsAString)
  const idComingFromRequest = req.params.identifier
  const student = studentsArray.filter(student => student.ID === idComingFromRequest)
  res.send(student)
})


router.post("/", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json")
  const fileAsABuffer = fs.readFileSync(studentsFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const studentsArray = JSON.parse(fileAsAString)
  const newstudent = req.body
  newstudent.ID = uniqid()
  studentsArray.push(newstudent)
  fs.writeFileSync(studentsFilePath, JSON.stringify(studentsArray))

  res.status(201).send({ id: newstudent.ID })
})
router.put("/:id", (req, res) => {
  
  const studentsFilePath = path.join(__dirname, "students.json")
  const fileAsABuffer = fs.readFileSync(studentsFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const studentsArray = JSON.parse(fileAsAString)
  const newstudentsArray = studentsArray.filter(student => student.ID !== req.params.id)
  const modifiedstudent = req.body
  modifiedstudent.ID = req.params.id

  newstudentsArray.push(modifiedstudent)
  fs.writeFileSync(studentsFilePath, JSON.stringify(newstudentsArray))
  res.send("Modify student route")
})


router.delete("/:id", (req, res) => {
  
  const studentsFilePath = path.join(__dirname, "students.json")
  const fileAsABuffer = fs.readFileSync(studentsFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const studentsArray = JSON.parse(fileAsAString)
  const newstudentsArray = studentsArray.filter(student => student.ID !== req.params.id)
  fs.writeFileSync(studentsFilePath, JSON.stringify(newstudentsArray))

  res.status(204).send()
})

module.exports = router