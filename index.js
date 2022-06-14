const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { nuevoCurso, getCursos, editarCurso, eliminarCurso } = require("./gestion");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/curso", async (req, res) => {
    const curso = req.body;
    const respuesta = await nuevoCurso(curso);
    //Devuelve la respuesta al cliente
    res.send(respuesta);
});

//Consultando cursos
app.get("/cursos", async (req, res) => {
    const respuesta = await getCursos();
    //Devuelve al cliente la respuesta almacenada en la const respuesta
    res.send(respuesta);
});

//editando cursos
app.put("/curso/:id", async (req, res) => {
    // Paso 2
    const { id } = req.params;
    // Paso 3
    const curso = req.body;
    // Paso 4
    const respuesta = await editarCurso(id, curso);
    // Paso 5
    res.send(respuesta);
});

//eliminando cursos
app.delete("/curso/:id", async (req, res) => {
    // Paso 2
    const { id } = req.params;
    // Paso 3
    const respuesta = await eliminarCurso(id);
    // Paso 4
    respuesta > 0
        ? res.send(`El curso de id ${id} fue eliminado con éxito`)
        : res.send("No existe un curso registrado con ese id");
});
//server
app.listen(3000, () => console.log("Servidor encendido"));