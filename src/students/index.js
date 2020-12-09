const express = require("express") 
const fs = require("fs") 
const path = require("path") 
const uniqid = require("uniqid") 

const router = express.Router()

const getFile=()=>{
    const studentsFilePath = path.join(__dirname, "students.json")
    const fileAsABuffer = fs.readFileSync(studentsFilePath)
    const fileAsAString = fileAsABuffer.toString()
    const studentsArray = JSON.parse(fileAsAString)
    return studentsArray
}

const readFile = fileName => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName))
  const fileContent = buffer.toString()
  return JSON.parse(fileContent)
}

router.get("/", (req, res) => {
  const studentsArray= getFile();
  res.send(studentsArray)
})

router.get("/:id/projects", (req, res) => {
  const projects= JSON.parse(fs.readFileSync(path.join(__dirname, "../projects", "projects.json")).toString());
  const studentId= req.params.id;
  const  studentProjects= projects.filter((project) => project.studentId === studentId);
  if (studentProjects.length === 0) {
    res.send("there are no projects for this student!");
  } else {
    res.send(studentProjects);
  }
});

  

router.get("/:identifier", (req, res) => {
  const studentsArray= getFile();
  const idComingFromRequest = req.params.identifier
  const student = studentsArray.filter(student => student.ID === idComingFromRequest)
  res.send(student)
})


router.post("/", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json")
  const studentsArray= getFile();
  const newstudent = req.body
  newstudent.ID = uniqid()
  studentsArray.push(newstudent)
  fs.writeFileSync(studentsFilePath, JSON.stringify(studentsArray))

  res.status(201).send({ id: newstudent.ID })
})
router.put("/:id", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json")
  const studentsArray= getFile();
  const newstudentsArray = studentsArray.filter(student => student.ID !== req.params.id)
  const modifiedstudent = req.body
  modifiedstudent.ID = req.params.id
  newstudentsArray.push(modifiedstudent)
  fs.writeFileSync(studentsFilePath, JSON.stringify(newstudentsArray))
  res.send("Modify student route")
})


router.delete("/:id", (req, res) => {
  
  const studentsFilePath = path.join(__dirname, "students.json")
  const studentsArray= getFile();
  const newstudentsArray = studentsArray.filter(student => student.ID !== req.params.id)
  fs.writeFileSync(studentsFilePath, JSON.stringify(newstudentsArray))

  res.status(204).send()
})

module.exports = router