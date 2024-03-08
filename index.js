const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const args = process.argv.slice(2);
const [action, filename, ...rest] = args;

function createFile(filename, content) {
  fs.writeFile(filename + ".txt", content, (err) => {
    if (err) throw err;
    console.log(`Archivo ${filename}.txt creado correctamente.`);
  });
}

function readFile(filename) {
  fs.readFile(filename + ".txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(`Contenido de ${filename}.txt:`);
    console.log(data);
  });
}

function updateFile(filename, content) {
  fs.writeFile(filename + ".txt", content, (err) => {
    if (err) throw err;
    console.log(`Archivo ${filename}.txt modificado correctamente.`);
  });
}

function deleteFile(filename) {
  fs.unlink(filename + ".txt", (err) => {
    if (err) throw err;
    console.log(`Archivo ${filename}.txt eliminado correctamente.`);
  });
}

function showMenu() {
  console.log("Menú de acciones:");
  console.log("1. Crear archivo");
  console.log("2. Leer archivo");
  console.log("3. Modificar archivo");
  console.log("4. Eliminar archivo");
  console.log("5. Salir");
  rl.question("Seleccione una acción (1-5): ", (answer) => {
    switch (answer) {
      case "1":
        rl.question("Nombre del archivo: ", (filename) => {
          rl.question("Contenido del archivo: ", (content) => {
            createFile(filename, content);
            showMenu();
          });
        });
        break;
      case "2":
        rl.question("Nombre del archivo: ", (filename) => {
          readFile(filename);
          showMenu();
        });
        break;
      case "3":
        rl.question("Nombre del archivo: ", (filename) => {
          rl.question("Nuevo contenido: ", (content) => {
            updateFile(filename, content);
            showMenu();
          });
        });
        break;
      case "4":
        rl.question("Nombre del archivo: ", (filename) => {
          deleteFile(filename);
          showMenu();
        });
        break;
      case "5":
        rl.close();
        break;
      default:
        console.log("Seleccione una opción válida.");
        showMenu();
        break;
    }
  });
}

showMenu();
