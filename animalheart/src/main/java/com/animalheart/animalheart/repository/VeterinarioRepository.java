package com.animalheart.animalheart.repository;

import com.animalheart.animalheart.entities.Veterinario;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Repositorio en memoria para {@link Veterinario}.
 *
 * Propósito:
 *   Servir datos “quemados” (hard-coded) para las vistas de Admin (lista/detalle)
 *       y para el login de veterinario.
 *   Ofrecer una API simple que luego puede migrarse a JPA/BD sin cambiar
 *       el resto de capas (controladores/servicios).
 *
 * Notas:
 *   Las imágenes son URL que apuntan a /static/IMAGES/... .
 *       En las vistas Thymeleaf se usan.
 *   El campo activo se maneja como int (1=Activo, 0=Inactivo).
 */
@Repository
public class VeterinarioRepository {

    /** Fuente de datos en memoria. Suficiente para el sprint actual. */
    private final List<Veterinario> veterinarios = new ArrayList<>();

    /**
     * Constructor que inicializa algunos registros de ejemplo.
     * Firma del constructor de {@link Veterinario}:
     */
    public VeterinarioRepository() {
        veterinarios.add(new Veterinario(
                12345,
                "Dr. Juan Pérez",
                "Cirugía",
                "juanPerez",                 // usuario para login
                "123",                       // clave (demo)
                "/IMAGES/drJuan.jpeg",       // foto (ruta en /static)
                1,                           // activo
                100                          // consultas/atenciones
        ));

        veterinarios.add(new Veterinario(
                67890,
                "Dra. Laura Gómez",
                "Dermatología",
                "lauraGomez",
                "123",
                "/IMAGES/draLaura.jpeg",
                1,
                85
        ));
    }

    /**
     * Devuelve la lista completa de veterinarios.
     * @return lista en memoria (mismo objeto; no es copia defensiva).
     */
    public List<Veterinario> findAll() {
        return veterinarios;
    }

    /**
     * Busca un veterinario por sus credenciales de acceso.
     * Se usa en el login del veterinario. En caso de no coincidir,
     * devuelve {@code null} para que el servicio/controlador muestre error.
     *
     * @param nombreUsuario usuario ingresado en el formulario.
     * @param contrasenia   contraseña ingresada en el formulario.
     * @return veterinario autenticado o {@code null} si no coincide.
     */
    public Veterinario buscarPorCredenciales(String nombreUsuario, String contrasenia) {
        for (Veterinario vet : veterinarios) {
            if (vet.getNombreUsuario().equals(nombreUsuario)
                    && vet.getContrasenia().equals(contrasenia)) {
                return vet;
            }
        }
        return null;
    }

    /**
     * Obtiene únicamente los veterinarios activos (estado = 1).
     * @return lista de activos.
     */
    public List<Veterinario> findAllActivos() {
    return veterinarios.stream()
            .filter(v -> v.getActivo() == 1)
            .toList();
    }

    /**
     * Busca un veterinario por su identificador.
     *
     * @param id identificador del veterinario.
     * @return {@link Optional} con el resultado; vacío si no existe.
     */
    public Optional<Veterinario> findById(Integer id) {
        return veterinarios.stream()
                .filter(v -> v.getId().equals(id))
                .findFirst();
    }
}
