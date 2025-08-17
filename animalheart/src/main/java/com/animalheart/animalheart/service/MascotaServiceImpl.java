package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Mascota;
import com.animalheart.animalheart.repository.MascotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementación de {@link MascotaService}.
 *
 * Responsabilidades:
 *   Delegar en {@link MascotaRepository} el acceso a datos de mascotas.
 *   Exponer operaciones de lectura usadas por los controladores (listado y detalle).
 */
@Service // Registra el bean de servicio para inyección en controladores.
public class MascotaServiceImpl implements MascotaService {

    /** Fuente de datos de mascotas. */
    private final MascotaRepository mascotaRepository;

    /**
     * Inyección por constructor recomendada.
     *
     * @param mascotaRepository repositorio que provee operaciones CRUD de Mascota.
     */
    public MascotaServiceImpl(MascotaRepository mascotaRepository) {
        this.mascotaRepository = mascotaRepository;
    }

    /**
     * Obtiene la lista completa de mascotas.
     *
     * Simple delegación a {@code mascotaRepository.findAll()}.
     * La vista de listado (p. ej., {@code ver-mascotas.html}) consumirá este resultado.
     *
     * @return lista de {@link Mascota}.
     */
    @Override
    public List<Mascota> obtenerTodasMascotas() {
        return mascotaRepository.findAll();
    }

    /**
     * Busca una mascota por su identificador.
     *
     * Delegación a {@code mascotaRepository.findById(id)} y retorno de
     * {@code null} si no existe (para que el controlador decida si redirige
     * o muestra un mensaje de "no encontrado").
     *
     * @param id identificador de la mascota.
     * @return la {@link Mascota} encontrada o {@code null} si no existe.
     */
    @Override
    public Mascota obtenerMascotaPorId(Integer id) {
        return mascotaRepository.findById(id).orElse(null);
    }

}
