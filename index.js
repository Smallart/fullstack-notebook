const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/',(request,response)=>{
    response.send(`<h1>Hello World!!!</h1>`)
})

app.get('/api/notes',(request,response)=>{
    response.json(notes)
})

app.get('/api/notes/:id',(request,response)=>{
    const id = request.params.id
    const note = notes.find(note=>note.id === id)    
    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id',(request,response)=>{
    const id = request.params.id
    notes = notes.filter(note=>note.id!==id)
    response.status(204).end()
})


//设定检测条件，上传的 content 属性不能为空而字段 important 默认为 false

const generateId = ()=>{
    const maxId = notes.length > 0 ? Math.max(...note.map(n=>Number(n.id))) : 0
    return String(maxId + 1)
}

app.post('/api/notes',(request,response)=>{
    const note = request.body
    if(note.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const newNote = {...note,id: generateId(),important: Boolean(body.important)||false}
    notes = notes.concat(newNote)
    response.json(newNote)
})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})