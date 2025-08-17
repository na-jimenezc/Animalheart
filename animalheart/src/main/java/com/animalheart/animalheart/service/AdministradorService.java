package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Administrador;

/**
 * Servicio de dominio para la autenticación y obtención de datos
 * del usuario Administrador.
 *
 * Responsabilidades:
 *   Validar credenciales del administrador (correo/clave).
 *   Recuperar el objeto {@link Administrador} asociado a un correo.
 */
public interface AdministradorService {

    /**
     * Valida las credenciales del administrador.
     *
     * Contrato esperado:

     *   Devuelve {@code true} si el par (correo, clave) es válido.
     *   Devuelve {@code false} en caso contrario (o si hay nulos).
     *
     * @param correo correo electrónico ingresado en el formulario (no nulo idealmente).
     * @param clave  contraseña ingresada en el formulario (no nula idealmente).
     * @return {@code true} si las credenciales son correctas; de lo contrario {@code false}.
     */
    boolean validar(String correo, String clave);

    /**
     * Obtiene el objeto {@link Administrador} asociado a un correo.
     *
     * Llamar después de {@link #validar(String, String)} para
     * guardar el administrador en sesión y así marcar al usuario como autenticado.
     *
     * @param correo correo del administrador ya validado.
     * @return instancia de {@link Administrador} si existe; en caso contrario {@code null}.
     */
    Administrador obtenerPorCorreo(String correo);
}
