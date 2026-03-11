const express = require("express")
const fs = require("fs")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())

// tampilkan file frontend
app.use(express.static(__dirname))

// route test API
app.get("/api",(req,res)=>{
res.send("MBG Bahan Baku API running")
})


// submit data
app.post("/submit",(req,res)=>{

const { email, remarks, cart } = req.body

if(!email){
return res.status(400).json({message:"Email wajib diisi"})
}

const data = {
email,
remarks,
cart,
date:new Date()
}

fs.readFile("data.json","utf8",(err,fileData)=>{

let arr=[]

if(!err && fileData){
arr=JSON.parse(fileData)
}

arr.push(data)

fs.writeFile("data.json",JSON.stringify(arr,null,2),()=>{

res.json({
message:"Data berhasil disimpan",
data
})

})

})

})

const PORT = 3000

app.listen(PORT,()=>{
console.log(`Server running on http://localhost:${PORT}`)
})