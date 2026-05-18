/* ============================= CONSIGNAS =============================

FUNCIONALIDADES:

    - Obtener todos los productos
    - Obtener producto específico por ID
    - Crear un nuevo producto
    - Eliminar un producto por ID

API A UTILIZAR -----------> https://fakestoreapi.com

================================ FORMA DE USO ==========================

1. GET ONE: npm start GET products/1        (1 al 20)
2. GET ALL: npm start GET products       
3. POST ONE: npm start POST products remera 300 algodón
4. DELETE ONE: npm start DELETE products/1  (1 al 20)

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

        // Insertar un nuevo producto
        case "POST":
            if (argumentos.length == 5 && argumentos[1] == "products") {
                const [, , nombre, precio, categoria] = argumentos;

                const response = await fetch(`${URL_API}/products`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            nombre,
                            precio,
                            categoria
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
        
        // Eliminar un producto por ID
        case "DELETE":

            if (argumentos[1].includes("/") && argumentos[1].includes("products")) {
                let id_temp = argumentos[1].split("/");

                try {
                    const id_prod = parseInt(id_temp[1]);

                    const response = await fetch(`${URL_API}/products/${id_prod}`, { method: "DELETE" });

                    if (!response.ok) {
                        throw new Error("----------------> FALLA EN LA SOLICITUD!");
                        break;
                    }

                    const data = await response.json();
                    console.log(data);
                    break;

                } catch (error) {
                    console.log(error);
                    break;
                }
            } else {
                console.log("----------------> FALLA EN LA SOLICITUD!")
            }

        default:
            break;
    }
}

// EJECUCIÓN DEL PROGRAMA
Principal(argumentos);