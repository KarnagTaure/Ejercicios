//Elementos de HTML
const tablero = document.getElementById("tableroJuego");
const puntuacion = document.getElementById("puntuacion");
const botonStart = document.getElementById("start");
const imagenGameOver = document.getElementById("gameOver");

//Settings del Juego
const sizeTablero = 10;
const celocidadJuego = 100;
const tiposCuadrado = {
  vacio: 0,
  serpiente: 1,
  comida: 2,
};

const direcciones = {
  arriba: -10,
  abajo: 10,
  derecha: 1,
  izquierda: -1,
};
//Variables del juego
var snake;
var score;
var direction;
var cuadroTablero;
var cuadroVacio;
var intervaloMovimiento;



const crearComidaAleatoria = () => {
  const lugarVacioRandom =
    cuadroVacio[Math.floor(Math.random() * cuadroVacio.length)];
  dibujarCuadrado(lugarVacioRandom, "comida");
};
const actualizarScore = () => {
  puntuacion.innerHTML = score;
};
const colocarSerpiente = () => {
  snake.forEach((cuadrado) => dibujarCuadrado(cuadrado, "serpiente"));
};
//Dibuja los cuadrados en el tablero de juego
//@params
//cuadrados:posicion del cuadrado
//type: tipos de cuadrados (vacio, Serpiente,Comida)
const dibujarCuadrado = (cuadrado, tipo) => {
  const [fila, columna] = cuadrado.split("");
  cuadroTablero[fila][columna] = tiposCuadrado[tipo];
  const elementoCuadrado = document.getElementById(cuadrado);
  elementoCuadrado.setAttribute("class", `cuadrado ${tipo}`);
  if (tipo === "vacio") {
    cuadroVacio.push(cuadrado);
  } else {
    if (cuadroVacio.indexOf(cuadrado) !== -1) {
      cuadroVacio.splice(cuadroVacio.indexOf(cuadrado), 1);
    }
  }
};

const eventoDireccion = key => {
  switch (key.code) {
    case "arriba":
      direction != "abajo" && setDirection(key.code);
      break;
    case "abajo":
      direction != "arriba" && setDirection(key.code);
      break;
    case "derecha":
      direction != "izquierda" && setDirection(key.code);
      break;
    case "izquierda":
      direction != "derecha" && setDirection(key.code);
      break;
  }
};

const crearTablero = () => {
  cuadroTablero.forEach((row, rowIndex) => {
    row.forEach((colum, columIndex) => {
      const valorCuadrado = `${rowIndex}${columIndex}`;
      const elementoCuadrado = document.createElement("div");
      elementoCuadrado.setAttribute("class", "cuadrado vacio");
      elementoCuadrado.setAttribute("id", valorCuadrado);
      tablero.appendChild(elementoCuadrado);
      cuadroVacio.push(valorCuadrado);
    });
  });
};

const setGame = () => {
  snake = ["00", "01", "02"];
  score = snake.length;
  direction = "derecha";
  cuadroTablero = Array.from(Array(sizeTablero), () =>
    new Array(sizeTablero).fill(tiposCuadrado.vacio)
  );
  console.log(cuadroTablero);
  tablero.innerHTML = "";
  cuadroVacio = [];
  crearTablero();
};
const startGame = () => {
  setGame();
  imagenGameOver.style.display = "none";
  botonStart.style.display = "none";
  colocarSerpiente();
  actualizarScore();
  crearComidaAleatoria();
  document.addEventListener("keydown", eventoDireccion);
};

botonStart.addEventListener("click", startGame);
