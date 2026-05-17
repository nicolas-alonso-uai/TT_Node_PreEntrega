/* ============================= CONSIGNAS =============================

FUNCIONALIDADES:
    1. Proyecto de tipo "Type Modules"
    2. Gestion de los productos:
        - Obtener todos los productos
        - Obtener producto específico por ID
        - Crear un nuevo producto
        - Eliminar un producto por ID

API A UTILIZAR -----------> https://fakestoreapi.com

================================ FORMA DE USO ==========================

1. GET ONE: npm start GET products/1        (1 al 20)
2. GET ALL: npm start GET products       

======================================================================== */

const URL_API = "https://fakestoreapi.com"

const argumentos = process.argv.slice(2);
const arg_validos = ["GET", "POST", "PUT", "DELETE"];

async function Principal(argumentos = []) {

    if (!argumentos[0] in arg_validos) {
        console.log("----------------> COMANDO INCORRECTO");
        return
    }

    switch (argumentos[0]) {
        // Obtener todos los productos y obtener un producto
        case "GET":
            if (!argumentos[1].includes("/") && argumentos[1] == "products") {
                try {
                    const response = await fetch(`${URL_API}/products`, { method: "GET" });

                    if (response.status !== 200) {
                        throw new Error("----------------> FALLA EN LA SOLICITUD!");
                        break;
                    }
                    const data = await response.json();
                    data.forEach(element => {
                        console.log(element)
                    });
                } catch (error) {
                    console.log(error);
                    break;
                }
            } else if (argumentos[1].includes("/") && argumentos[1].includes("products")) {
                let id_temp = argumentos[1].split("/");

                try {
                    const id_prod = parseInt(id_temp[1]);

                    const response = await fetch(`${URL_API}/products/${id_prod}`, { method: "GET" });

                    if (response.status !== 200) {
                        throw new Error("----------------> FALLA EN LA SOLICITUD!")
                    }

                    const data = await response.json();
                    console.log(data);
                    break;

                } catch (error) {
                    console.log(error);
                    break;
                }
            } else {
                console.log("----------------> COMANDO INCORRECTO!")
            }

        case "POST":
            if (argumentos.length == 5 && argumentos[1] == "products") {
                const [, , nombre, precio, categoria] = argumentos;

                const response = await fetch(`${URL_API}/products`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            nombre: nombre,
                            precio: precio,
                            categoria: categoria
                        }
                    )
                })

                if (!response.ok) {
                    throw new Error("----------------> FALLA EN LA SOLICITUD!")
                }

                const data = await response.json();
                console.log(data);
                break
            } else {
                console.log("----------------> SOLICITUD INCOMPLETA!");
                break;
            }


        default:
            break;
    }
}

Principal(argumentos);




/*
//const method = process.argv[2];
//const endpoint = process.argv[3];
const [, , method, endpoint, ...args] = process.argv;

console.log(`Method: ${method}`);
console.log(`Endpoint: ${endpoint}`);

const endpoint_completo = endpoint.split("/");
const recurso = endpoint_completo[0];
const id_recurso = parseInt(endpoint_completo[1]);

// Programa Principal

async function Principal() {
    switch (method) {
    case "GET":
        try {
            if (endpoint.includes("products/")) {
                if (id_recurso <= 20) {
                    const response = await fetch(`${URL_API}/products/${id_recurso}`)
                        .then((response) => response.json())
                        .then((data) => console.log(data))
                    console.log("-------------------> Consulta correcta del producto !!")
                    break
                } else {
                    console.log("-------------------> Consulta incorrecta, no existe ese producto !!")
                }

            }
            if (!endpoint.includes("products/")) {
                fetch(`${URL_API}/products`)
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                console.log("-------------------> Consulta correcta de todos los productos !!")
                break
            }
        } catch (error) {
            throw new Error(error);
        }
    case "POST":
        try {
            if (endpoint.includes("products")) {
                const [, , , , nombre, precio, categoria] = process.argv;
                const response = await fetch('https://fakestoreapi.com/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            nombre: nombre,
                            precio: precio,
                            categoria: categoria
                        }
                    )
                })
                const data = await response.json()
                console.log(data);
                break;
            }
        } catch (error) {
            throw new Error(error);
        }
}
}

Principal();
*/