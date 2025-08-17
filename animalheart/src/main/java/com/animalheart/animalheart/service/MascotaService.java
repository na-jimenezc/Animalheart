package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Mascota;
import java.util.List;

/**
 * Servicio de dominio para operaciones relacionadas con {@link Mascota}.
 *
 * Responsabilidades:
 *   Proveer la lista completa de mascotas (para vistas de listado).
 *   Obtener el detalle de una mascota a partir de su identificador.
 */
public interface MascotaService {

    /**
     * Recupera todas las mascotas disponibles.
     *
     * @return lista de {@link Mascota}.
     */
    List<Mascota> obtenerTodasMascotas();

    /**
     * Busca una mascota por su identificador.
     *
     * @param id identificador único de la mascota.
     * @return la {@link Mascota} encontrada, o {@code null} si no existe.
     */
    Mascota obtenerMascotaPorId(Integer id);
}
