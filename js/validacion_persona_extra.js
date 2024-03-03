
//TODO Añade cuando se pulsa el boton de añadir mas personas que los inputs del div que aparece sean requeridos que cuando se oculte o cierre la modal que se quite el required y cuando se añade, sume 30 euros al precio definido para esa excursion

document.addEventListener('DOMContentLoaded', function() {
    // Selecciona solo los botones dentro de modales con la clase 'añadir-persona'
    document.querySelectorAll('.añadir-persona .btn-añadir-persona').forEach(function(boton) {
        let collapseTarget = boton.getAttribute('data-bs-target');
        let collapseElement = document.querySelector(collapseTarget);

        // Agregar event listeners para cuando el collapse se muestra/oculta
        collapseElement.addEventListener('shown.bs.collapse', function() {
            let inputs = this.querySelectorAll('input');
            inputs.forEach(input => input.required = true);
            // Aumenta el precio
            actualizarPrecio(this.closest('.modal.añadir-persona'), 30);
        });

        collapseElement.addEventListener('hidden.bs.collapse', function() {
            let inputs = this.querySelectorAll('input');
            inputs.forEach(input => input.required = false);
            // Reduce el precio
            actualizarPrecio(this.closest('.modal.añadir-persona'), -30);
        });
    });

    // Manejar el cierre de las modales con la clase 'añadir-persona' para resetear los inputs y el precio
    document.querySelectorAll('.modal.añadir-persona').forEach(function(modal) {
        modal.addEventListener('hidden.bs.modal', function() {
            let collapses = this.querySelectorAll('.collapse');
            collapses.forEach(function(collapse) {
                let inputs = collapse.querySelectorAll('input');
                inputs.forEach(input => {
                    input.required = false;
                    input.value = ''; // Limpia el valor del input
                });
                // Cierra el collapse si está abierto
                if (collapse.classList.contains('show')) {
                    let bsCollapse = bootstrap.Collapse.getInstance(collapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
            //todo Restablece el precio al original cuando la modal se cierra
            restablecerPrecioOriginal(this);
        });
    });

    function actualizarPrecio(modal, cambio) {
        let precioAlerta = modal.querySelector('.precio-excursion');
        if (precioAlerta) {
            let precioActual = parseInt(precioAlerta.textContent.match(/\d+/)[0]);
            let nuevoPrecio = precioActual + cambio;
            precioAlerta.textContent = `Precio: ${nuevoPrecio}€`;
        }
    }

    function restablecerPrecioOriginal(modal) {
        let precioAlerta = modal.querySelector('.precio-excursion');
        if (precioAlerta) {
            // Asume que el precio original está almacenado en un atributo data
            let precioOriginal = precioAlerta.getAttribute('data-precio-original');
            if (!precioOriginal) {
                // Si no hay un precio original almacenado, no cambia el texto
                return;
            }
            precioAlerta.textContent = precioOriginal;
        }
    }
});
