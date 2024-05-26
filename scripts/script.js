document.addEventListener("DOMContentLoaded", function () {
    // Arreglo para almacenar las ramas y sus frecuencias
    let ramas = [];
    let frecuencias = [];

    // Evento para agregar rama
    document.getElementById("agregar-rama").addEventListener("click", function () {
        const ramaInput = document.getElementById("rama-input").value.trim();
        const frecuenciaInput = parseInt(document.getElementById("frecuencia-input").value);
        if (ramaInput !== "" && !isNaN(frecuenciaInput) && frecuenciaInput >= 0) {
            ramas.push(ramaInput);
            frecuencias.push(frecuenciaInput);
            actualizarListaRamas();
            document.getElementById("rama-input").value = "";
            document.getElementById("frecuencia-input").value = "";

            // Agrega margen inferior al elemento ishikawa-content
            const ishikawaContent = document.getElementById("ishikawa-content");
            ishikawaContent.style.marginBottom = "100px";
        }
    });

    // Evento para confirmar el diagrama
    document.getElementById("confirmar-diagrama").addEventListener("click", function () {
        if (ramas.length > 0 && frecuencias.length > 0) {
            generarDiagramaDePareto();
        }
    });

    // Función para actualizar la lista de ramas en el HTML
    function actualizarListaRamas() {
        const ramasList = document.getElementById("ramas-list");
        ramasList.innerHTML = "";
        for (let i = 0; i < ramas.length; i++) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div>    
                <span>${ramas[i]} ➔ </span>
                <span class="frecuencia"}>${frecuencias[i]}</span>
                <button class="eliminar-rama" data-index="${i}">Eliminar</button>
                </div>
            `;
            ramasList.appendChild(listItem);
        }
        // Agregar eventos para eliminar ramas
        const eliminarRamaButtons = document.querySelectorAll(".eliminar-rama");
        eliminarRamaButtons.forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                ramas.splice(index, 1);
                frecuencias.splice(index, 1);
                actualizarListaRamas();
            });
        });
    }

    // Función para generar un diagrama de Pareto con los datos ingresados por el usuario
    function generarDiagramaDePareto() {
        // Obtener el título del diagrama Ishikawa
        const tituloIshikawa = document.getElementById("titulo-ishikawa").value.trim();

        // Crear el título del diagrama de Pareto
        const tituloPareto = `Diagrama de Pareto - ${tituloIshikawa}`;

        const tituloParetoElement = document.getElementById("titulo-pareto");
        tituloParetoElement.textContent = tituloPareto;

        // Crear un objeto que almacena las ramas y sus frecuencias correspondientes
        const datosRamas = ramas.map((rama, index) => ({
            rama,
            frecuencia: frecuencias[index]
        }));

        // Ordenar las ramas por sus frecuencias en orden descendente
        datosRamas.sort((a, b) => b.frecuencia - a.frecuencia);

        // Obtener las ramas ordenadas y las frecuencias correspondientes
        const ramasOrdenadas = datosRamas.map(rama => rama.rama);
        const frecuenciasOrdenadas = datosRamas.map(rama => rama.frecuencia);

        // Calcular la frecuencia relativa en porcentaje y la frecuencia relativa acumulada
        const totalFrecuencia = frecuenciasOrdenadas.reduce((a, b) => a + b, 0);
        const frecuenciaRelativaPorcentaje = frecuenciasOrdenadas.map(frecuencia => (frecuencia / totalFrecuencia) * 100);
        const frecuenciaRelativaAcumulada = frecuenciaRelativaPorcentaje.reduce((acc, val, index) => {
            if (index === 0) {
                acc.push(val);
            } else {
                acc.push(val + acc[index - 1]);
            }
            return acc;
        }, []);

        // Calcular la línea naranja
        const acumulacionPorcentaje = [];
        let acumulado = 0;
        for (const porcentaje of frecuenciaRelativaPorcentaje) {
            acumulado += porcentaje;
            acumulacionPorcentaje.push(acumulado);
        }

        // Antes de generar el gráfico, determina si la línea naranja está por debajo o igual al 80%
        const porcentajeLimite = 80; // Define el porcentaje límite
        const colorBarras = []; // Array para almacenar colores de las barras

        for (let i = 0; i < ramasOrdenadas.length; i++) {
            // Comprueba si el porcentaje de esta rama es menor o igual al límite
            if (frecuenciaRelativaAcumulada[i] <= porcentajeLimite) {
                // Si es menor o igual al límite, establece un color diferente (por ejemplo, rojo)
                colorBarras.push("red");
            } else {
                // De lo contrario, usa el color predeterminado (por ejemplo, azul)
                colorBarras.push("#007bff");
            }
        }

        // Crear el gráfico de Pareto con línea naranja
        const ctx = document.getElementById("pareto-chart").getContext("2d");
        const paretoChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ramasOrdenadas,
                datasets: [
                    {
                        label: "Frecuencia",
                        data: frecuenciaRelativaPorcentaje,
                        backgroundColor: colorBarras
                    },
                    {
                        label: "Acumulación",
                        data: acumulacionPorcentaje,
                        borderColor: "#FFA500",
                        fill: false,
                        type: "line",
                        yAxisID: "y-axis-2"
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: "Porcentaje (%)"
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Ramas"
                        }
                    },
                    "y-axis-2": {
                        beginAtZero: true,
                        max: 100,
                        position: "right",
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Mostrar la sección de Pareto
        document.getElementById("pareto").style.display = "block";
    }

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
            a.download = 'Ishikawa y Pareto.png';

            // Agregar el enlace al documento y hacer clic automáticamente
            document.body.appendChild(a);
            a.click();

            // Limpiar el elemento <a> después de la descarga
            document.body.removeChild(a);
        });
    }
});