package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Veterinario;
import java.util.List;

/**
 * Servicio de dominio para operaciones relacionadas con {@link Veterinario}.
 *
 * Responsabilidades principales:
 *   Autenticar veterinarios (validación básica de credenciales para el login actual).
 *   Listar veterinarios (todos o solo activos).
 *   Obtener el detalle de un veterinario por su identificador.
 */
public interface VeterinarioService {

    /**
     * Devuelve la lista completa de veterinarios (sin filtrar por estado).
     *
     * @return lista con todos los {@link Veterinario}.
     */
    List<Veterinario> obtenerTodos();

    /**
     * Valida credenciales de acceso del veterinario.
     *
     * Llamado desde el controlador de login. Si las credenciales
     * son correctas, devuelve la entidad del veterinario; de lo contrario,
     * devuelve {@code null}.
     *
     * @param nombreUsuario usuario ingresado en el formulario.
     * @param contrasenia   contraseña ingresada en el formulario.
     * @return el {@link Veterinario} autenticado o {@code null} si no coincide.
     */
    Veterinario validarVeterinario(String nombreUsuario, String contrasenia);

    /**
     * Obtiene únicamente los veterinarios activos (disponibles).
     *
     * @return lista de {@link Veterinario} con estado activo.
     */
    List<Veterinario> obtenerVeterinariosActivos();

    /**
     * Busca un veterinario por su identificador.
     *
     * @param id identificador único del veterinario.
     * @return el {@link Veterinario} encontrado o {@code null} si no existe.
     */
    Veterinario obtenerVeterinarioPorId(Integer id);
}
