document.addEventListener("DOMContentLoaded", function () {
    // Arreglos para almacenar los aspectos de FODA
    const fortalezas = [];
    const debilidades = [];
    const oportunidades = [];
    const amenazas = [];

    // Arreglos para almacenar los aspectos de CATWDA
    const clientes = [];
    const actores = [];
    const transformacion = [];
    const weltanschauung = [];
    const duenos = [];
    const ambiente = [];

    // Función para agregar un aspecto a una lista
    function agregarAspecto(lista, inputId) {
        const aspectoInput = document.getElementById(inputId);
        const aspecto = aspectoInput.value.trim();
        if (aspecto !== "") {
            const listaElement = document.querySelector(lista);
            const listItem = document.createElement("li");
            listItem.textContent = aspecto;

            // Botón para eliminar este aspecto
            const eliminarButton = document.createElement("button");
            eliminarButton.textContent = "Eliminar";
            eliminarButton.classList.add("btn", "btn-danger", "ml-2");
            eliminarButton.addEventListener("click", function () {
                listaElement.removeChild(listItem);
                // Remover el aspecto de la lista correspondiente
                if (lista === "#fortalezas-list") {
                    const index = fortalezas.indexOf(aspecto);
                    if (index > -1) {
                        fortalezas.splice(index, 1);
                    }
                } else if (lista === "#debilidades-list") {
                    const index = debilidades.indexOf(aspecto);
                    if (index > -1) {
                        debilidades.splice(index, 1);
                    }
                } else if (lista === "#oportunidades-list") {
                    const index = oportunidades.indexOf(aspecto);
                    if (index > -1) {
                        oportunidades.splice(index, 1);
                    }
                } else if (lista === "#amenazas-list") {
                    const index = amenazas.indexOf(aspecto);
                    if (index > -1) {
                        amenazas.splice(index, 1);
                    }
                }
                // También remover el aspecto de la lista de CATWDA si corresponde
                if (lista === "#clientes-list") {
                    const index = clientes.indexOf(aspecto);
                    if (index > -1) {
                        clientes.splice(index, 1);
                    }
                } else if (lista === "#actores-list") {
                    const index = actores.indexOf(aspecto);
                    if (index > -1) {
                        actores.splice(index, 1);
                    }
                } else if (lista === "#transformacion-list") {
                    const index = transformacion.indexOf(aspecto);
                    if (index > -1) {
                        transformacion.splice(index, 1);
                    }
                } else if (lista === "#weltanschauung-list") {
                    const index = weltanschauung.indexOf(aspecto);
                    if (index > -1) {
                        weltanschauung.splice(index, 1);
                    }
                } else if (lista === "#duenos-list") {
                    const index = duenos.indexOf(aspecto);
                    if (index > -1) {
                        duenos.splice(index, 1);
                    }
                } else if (lista === "#ambiente-list") {
                    const index = ambiente.indexOf(aspecto);
                    if (index > -1) {
                        ambiente.splice(index, 1);
                    }
                }
            });

            listItem.appendChild(eliminarButton);
            listaElement.appendChild(listItem);
            aspectoInput.value = ""; // Limpiar el campo de entrada

            // Agregar el aspecto a la lista correspondiente
            if (lista === "#fortalezas-list") {
                fortalezas.push(aspecto);
            } else if (lista === "#debilidades-list") {
                debilidades.push(aspecto);
            } else if (lista === "#oportunidades-list") {
                oportunidades.push(aspecto);
            } else if (lista === "#amenazas-list") {
                amenazas.push(aspecto);
            } else if (lista === "#clientes-list") {
                clientes.push(aspecto);
            } else if (lista === "#actores-list") {
                actores.push(aspecto);
            } else if (lista === "#transformacion-list") {
                transformacion.push(aspecto);
            } else if (lista === "#weltanschauung-list") {
                weltanschauung.push(aspecto);
            } else if (lista === "#duenos-list") {
                duenos.push(aspecto);
            } else if (lista === "#ambiente-list") {
                ambiente.push(aspecto);
            }
        }
    }

    // Eventos para agregar aspectos a FODA
    document.getElementById("add-fortaleza").addEventListener("click", function () {
        agregarAspecto("#fortalezas-list", "fortalezas-input");
    });

    document.getElementById("add-debilidad").addEventListener("click", function () {
        agregarAspecto("#debilidades-list", "debilidades-input");
    });

    document.getElementById("add-oportunidad").addEventListener("click", function () {
        agregarAspecto("#oportunidades-list", "oportunidades-input");
    });

    document.getElementById("add-amenaza").addEventListener("click", function () {
        agregarAspecto("#amenazas-list", "amenazas-input");
    });

    // Eventos para agregar aspectos a CATWDA
    document.getElementById("add-cliente").addEventListener("click", function () {
        agregarAspecto("#clientes-list", "clientes-input");
    });

    document.getElementById("add-actor").addEventListener("click", function () {
        agregarAspecto("#actores-list", "actores-input");
    });

    document.getElementById("add-transformacion").addEventListener("click", function () {
        agregarAspecto("#transformacion-list", "transformacion-input");
    });

    document.getElementById("add-weltanschauung").addEventListener("click", function () {
        agregarAspecto("#weltanschauung-list", "weltanschauung-input");
    });

    document.getElementById("add-dueno").addEventListener("click", function () {
        agregarAspecto("#duenos-list", "duenos-input");
    });

    document.getElementById("add-ambiente").addEventListener("click", function () {
        agregarAspecto("#ambiente-list", "ambiente-input");
    });

    document.getElementById("guardar-imagen").addEventListener("click", function () {
        guardarPaginaComoImagen();
    });
    
    // Función para guardar la página como imagen
    function guardarPaginaComoImagen() {
        const container = document.body;

        // Utilizar html2canvas para capturar la página como una imagen
        html2canvas(container).then(function (canvas) {
            const imgData = canvas.toDataURL("image/png");

            // Crear un elemento <a> para descargar la imagen
            const a = document.createElement('a');
            a.href = imgData;
            a.download = 'FODA y CATWDA.png';

            // Agregar el enlace al documento y hacer clic automáticamente
            document.body.appendChild(a);
            a.click();

            // Limpiar el elemento <a> después de la descarga
            document.body.removeChild(a);
        }); 
    }
});