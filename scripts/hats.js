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
        a.download = '6 Sombreros para Pensar.png';

        // Agregar el enlace al documento y hacer clic automáticamente
        document.body.appendChild(a);
        a.click();

        // Limpiar el elemento <a> después de la descarga
        document.body.removeChild(a);
    });
}


// Función para agregar un aspecto a una lista
function agregarAspecto(inputId, listId) {
    const aspectoInput = document.getElementById(inputId);
    const aspecto = aspectoInput.value.trim();
    if (aspecto !== "") {
        const aspectosList = document.getElementById(listId);
        const listItem = document.createElement("li");
        listItem.textContent = aspecto;

        // Botón para eliminar este aspecto
        const eliminarButton = document.createElement("button");
        eliminarButton.textContent = "Eliminar";
        eliminarButton.classList.add("btn", "btn-danger", "ml-2");
        eliminarButton.addEventListener("click", function () {
            aspectosList.removeChild(listItem); 
        });

        listItem.appendChild(eliminarButton);
        aspectosList.appendChild(listItem);
        aspectoInput.value = ""; // Limpiar el campo de entrada
    }
}

// Eventos para agregar aspectos
const agregarBotones = document.querySelectorAll("[id^='add-aspecto']");
agregarBotones.forEach(function (boton) {
    const sombreroId = boton.getAttribute("id").replace("add-aspecto", "");
    const inputId = "aspecto" + sombreroId;
    const listId = "aspectos-list" + sombreroId;

    boton.addEventListener("click", function () {
        agregarAspecto(inputId, listId);
    });
});