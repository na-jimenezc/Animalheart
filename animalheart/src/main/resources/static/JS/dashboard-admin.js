// dashboard-admin.js — Gráficas para el Dashboard de Admin (Chart.js)
document.addEventListener('DOMContentLoaded', () => {
  // 1) Obtener dataset transferido por Thymeleaf
  const elDatos = document.getElementById('datosDashboard');
  if (!elDatos) return;

  const datos = elDatos.dataset;
  // data-ventas-tratamientos => ventasTratamientos (camelCase), etc.
  const ventasPorTratamiento = (datos.ventasTratamientos || '')
    .split(',')
    .map(x => Number(x.trim()))
    .filter(n => !Number.isNaN(n));

  const ganancias = (datos.ganancias || '')
    .split(',')
    .map(x => Number(x.trim()))
    .filter(n => !Number.isNaN(n));

  const top3Tratamientos = (datos.topTratamientos || '')
    .split(',')
    .map(x => Number(x.trim()))
    .filter(n => !Number.isNaN(n));

  const totalVeterinarios = Number.parseInt(datos.veterinarios ?? '0', 10) || 0;
  const totalMascotas     = Number.parseInt(datos.mascotas ?? '0', 10) || 0;
  const ventasTotales     = Number.parseFloat(datos.ventasTotales ?? '0') || 0; // (no usado aquí, pero disponible)

  // Pequeña utilidad: devuelve el canvas o null si no existe
  const $ = (id) => document.getElementById(id);

  // 2) Crear gráficos solo si existe el canvas y Chart está disponible
  if (typeof Chart !== 'undefined') {
    const cvVet = $('graficoVeterinarios');
    if (cvVet) {
      new Chart(cvVet, {
        type: 'doughnut',
        data: {
          labels: ['Activos', 'Inactivos'],
          datasets: [{
            data: [totalVeterinarios, Math.max(0, 50 - totalVeterinarios)],
            backgroundColor: ['#f76c6c', '#ffbaba']
          }]
        }
      });
    }

    const cvAnim = $('graficoAnimales');
    if (cvAnim) {
      new Chart(cvAnim, {
        type: 'doughnut',
        data: {
          labels: ['Activos', 'Otros'],
          datasets: [{
            data: [totalMascotas, Math.max(0, 50 - totalMascotas)],
            backgroundColor: ['#4ecdc4', '#d3f3f2']
          }]
        }
      });
    }

    const cvVentasTrat = $('ventasPorTratamiento');
    if (cvVentasTrat && ventasPorTratamiento.length) {
      new Chart(cvVentasTrat, {
        type: 'bar',
        data: {
          labels: ['Castración', 'Parvovirus', 'Rabia', 'Antibiótico'],
          datasets: [{
            label: 'Cantidad vendida',
            backgroundColor: '#a16ae8',
            data: ventasPorTratamiento
          }]
        }
      });
    }

    const cvVentasTot = $('ventasTotales');
    if (cvVentasTot) {
      new Chart(cvVentasTot, {
        type: 'pie',
        data: {
          labels: ['Medicamentos', 'Consultas', 'Vacunas'],
          datasets: [{
            data: [100, 90, 77.79], // placeholder si no implementas desglose
            backgroundColor: ['#86E3CE', '#FFDD94', '#D8B6A4']
          }]
        }
      });
    }

    const cvGan = $('graficoGanancias');
    if (cvGan && ganancias.length) {
      new Chart(cvGan, {
        type: 'line',
        data: {
          labels: ['Veterinarios', 'Tratamientos', 'Sueldos'],
          datasets: [{
            label: 'Ganancias (COP)',
            data: ganancias,
            fill: true,
            borderColor: '#574b90',
            backgroundColor: 'rgba(87,75,144,0.2)'
          }]
        }
      });
    }

    const cvTop = $('top3Tratamientos');
    if (cvTop && top3Tratamientos.length) {
      new Chart(cvTop, {
        type: 'bar',
        data: {
          labels: ['Castración', 'Parvovirus', 'Antibiótico'],
          datasets: [{
            label: 'Frecuencia',
            data: top3Tratamientos,
            backgroundColor: ['#a16ae8', '#ff8c94', '#4ecdc4']
          }]
        }
      });
    }
  }
});
