// script-dashboard.js
// ------------------------
// Este script renderiza todos los gráficos del dashboard del administrador.
// Utiliza los datos inyectados desde Thymeleaf al cargar la vista.

document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener("DOMContentLoaded", function () {
    const datos = document.getElementById("datosDashboard").dataset;

    // Parsear arrays desde strings (porque vienen como "30,50,10,20")
    const ventasPorTratamiento = datos.ventasTratamientos.split(',').map(Number);
    const ganancias = datos.ganancias.split(',').map(Number);
    const top3Tratamientos = datos.topTratamientos.split(',').map(Number);
    const totalVeterinarios = parseInt(datos.veterinarios);
    const totalMascotas = parseInt(datos.mascotas);
    const ventasTotales = parseFloat(datos.ventasTotales);

    // Ahora puedes usar estas variables en tus gráficos:
    new Chart(document.getElementById('graficoVeterinarios'), {
        type: 'doughnut',
        data: {
            labels: ["Activos", "Inactivos"],
            datasets: [{
                data: [totalVeterinarios, 50 - totalVeterinarios],
                backgroundColor: ["#f76c6c", "#ffbaba"]
            }]
        }
    });

    // Gráfico tipo donut para veterinarios activos/inactivos
    new Chart(document.getElementById('graficoVeterinarios'), {
        type: 'doughnut',
        data: {
            labels: ["Activos", "Inactivos"],
            datasets: [{
                data: [totalVeterinarios, 50 - totalVeterinarios],
                backgroundColor: ["#f76c6c", "#ffbaba"]
            }]
        }
    });

    // Gráfico tipo donut para mascotas activas
    new Chart(document.getElementById('graficoAnimales'), {
        type: 'doughnut',
        data: {
            labels: ["Activos", "Otros"],
            datasets: [{
                data: [totalMascotas, 50 - totalMascotas],
                backgroundColor: ["#4ecdc4", "#d3f3f2"]
            }]
        }
    });

    // Gráfico de barras: cantidad de ventas por tratamiento
    new Chart(document.getElementById('ventasPorTratamiento'), {
        type: 'bar',
        data: {
            labels: ["Castración", "Parvovirus", "Rabia", "Antibiótico"],
            datasets: [{
                label: "Cantidad vendida",
                backgroundColor: "#a16ae8",
                data: ventasPorTratamiento
            }]
        }
    });

    // Gráfico de tipo pie: distribución de ingresos por servicio
    new Chart(document.getElementById('ventasTotales'), {
        type: 'pie',
        data: {
            labels: ["Medicamentos", "Consultas", "Vacunas"],
            datasets: [{
                data: [100, 90, 77.79],
                backgroundColor: ["#86E3CE", "#FFDD94", "#D8B6A4"]
            }]
        }
    });

    // Gráfico de línea/área: ganancias en COP
    new Chart(document.getElementById('graficoGanancias'), {
        type: 'line',
        data: {
            labels: ["Veterinarios", "Tratamientos", "Sueldos"],
            datasets: [{
                label: "Ganancias (COP)",
                data: ganancias,
                fill: true,
                borderColor: "#574b90",
                backgroundColor: "rgba(87,75,144,0.2)"
            }]
        }
    });

    // Gráfico de barras: Top 3 tratamientos más frecuentes
    new Chart(document.getElementById('top3Tratamientos'), {
        type: 'bar',
        data: {
            labels: ["Castración", "Parvovirus", "Antibiótico"],
            datasets: [{
                label: "Frecuencia",
                data: top3Tratamientos,
                backgroundColor: ["#a16ae8", "#ff8c94", "#4ecdc4"]
            }]
        }
    });
}); });
