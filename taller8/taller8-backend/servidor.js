// Taller 8: CRUD completo + middlewares + express.Router
// Este es el servidor del Taller 7 (con cors). Sigue los pasos del README
// y completa cada sección marcada con un número.

const express = require("express");
const cors = require("cors");
// 3: Importar morgan.

const app = express();

// 3: Registrar morgan para mostrar cada petición en la terminal (debe ser el primer middleware).
const morgan = require("morgan");
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("¡Hola desde mi primer servidor con Express!");
});

app.get("/saludo/:nombre", (req, res) => {
  res.send(`¡Hola, ${req.params.nombre}!`);
});


const postsRouter = require("./routes/posts");
app.use("/api/posts", postsRouter);


// 4: Convertir este middleware en una función con nombre: endpointDesconocido.
const endpointDesconocido = (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
};

app.use(endpointDesconocido);

// 5: Crear el middleware que maneja los errores (debe recibir 4 parámetros).

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
