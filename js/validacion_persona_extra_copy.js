
//TODO validacion del required para los inputs cuando se pulsa en el boton de añadir mas personas

document.addEventListener('DOMContentLoaded', function() {
    // Selecciona solo los botones dentro de modales con la clase 'añadir-persona'
    document.querySelectorAll('.añadir-persona .btn-añadir-persona').forEach(function(boton) {
        let collapseTarget = boton.getAttribute('data-bs-target');
        let collapseElement = document.querySelector(collapseTarget);

        // Agregar event listeners para cuando el collapse se muestra/oculta
        collapseElement.addEventListener('shown.bs.collapse', function() {
            let inputs = this.querySelectorAll('input');
            inputs.forEach(input => input.required = true);
        });

        collapseElement.addEventListener('hidden.bs.collapse', function() {
            let inputs = this.querySelectorAll('input');
            inputs.forEach(input => input.required = false);
        });
    });

    // Manejar el cierre de las modales con la clase 'añadir-persona' para resetear los inputs
    document.querySelectorAll('.modal.añadir-persona').forEach(function(modal) {
        modal.addEventListener('hidden.bs.modal', function() {
            let collapses = this.querySelectorAll('.collapse');
            collapses.forEach(function(collapse) {
                let inputs = collapse.querySelectorAll('input');
                inputs.forEach(input => {
                    input.required = false;
                    input.value = ''; // Opcional: limpia el valor del input
                });
                // Cierra el collapse si está abierto
                if (collapse.classList.contains('show')) {
                    let bsCollapse = bootstrap.Collapse.getInstance(collapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });
    });
});
