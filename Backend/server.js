const express = require("express")

const app = express()

const PORT = 5000 ;

app.get("/", (req,res) => {
    res.send("Welcome to our Ecommerce Backend Version 2")
})

app.get("/products", (req,res) => {
    res.send("all products")
})
app.get("/users", (req,res) => {
    res.send("all users")
})
app.get("/orders", (req,res) => {
    res.send("all orders")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
})