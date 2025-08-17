package com.animalheart.animalheart.repository;

import com.animalheart.animalheart.entities.Mascota;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Repositorio en memoria para {@link Mascota}.
 *
 * Objetivo:
 * suministrar datos "quemados" (hard-coded) para las vistas de
 * listado y detalle sin depender todavía de una base de datos.
 *
 * Imágenes: los paths apuntan a /static/IMAGES/... .
 * En Thymeleaf se usan.
 */
@Repository
public class MascotaRepository {

    /** Fuente de datos en memoria mutable para poder añadir/eliminar en pruebas. */
    private final List<Mascota> mascotas = new ArrayList<>();

    /**
     * Inicializa registros de ejemplo.
     *
     * Firma del constructor de {@link Mascota}:
     */
    public MascotaRepository() {
        mascotas.add(new Mascota(
                1, "Firulais", "Criollo", 3,
                "Perro", "Ninguna", 25.4, 101, "/IMAGES/firulais.jpg"
        ));
        mascotas.add(new Mascota(
                2, "Roberto", "Persa", 2,
                "Gato", "Ninguna", 4.8, 102, "/IMAGES/roberto.jpeg"
        ));
        mascotas.add(new Mascota(
                3, "Rocky", "Criollo", 5,
                "Perro", "Patita torcida", 30.2, 103, "/IMAGES/rocky.jpeg"
        ));
    }

    /**
     * Devuelve todas las mascotas.
     * Se retorna la lista interna; si prefieres evitar modificaciones externas,
     * devuelve una copia nueva.
     */
    public List<Mascota> findAll() {
        return mascotas;
    }

    /**
     * Busca una mascota por su identificador.
     *
     * @param id identificador único.
     * @return {@link Optional} con la mascota; vacío si no existe.
     */
    public Optional<Mascota> findById(Integer id) {
        return mascotas.stream()
                .filter(m -> m.getId().equals(id))
                .findFirst();
    }

}
