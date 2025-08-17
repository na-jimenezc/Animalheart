package com.animalheart.animalheart.entities;

import java.io.Serializable;

/**
 * Entidad de dominio que representa al usuario Administrador del sistema.
 *
 * Es un POJO simple usado para:
 *   Almacenar datos básicos del admin durante la autenticación.
 *   Guardar el administrador autenticado en sesión (atributo "ADMIN_AUTH").
 */
public class Administrador implements Serializable {

     private static final long serialVersionUID = 1L;

    /** Identificador único del administrador (clave técnica). */
    private Integer id;

    /** Nombre para mostrar del administrador. */
    private String nombre;

    /** Correo electrónico del administrador (también se usa como usuario). */
    private String correo;

    // --------------------------------------------------------------------
    // Constructores
    // --------------------------------------------------------------------

    /** Constructor vacío requerido por frameworks y para data binding. */
    public Administrador() {}

    /**
     * Constructor de conveniencia para poblar datos de prueba o crear la instancia completa.
     *
     * @param id     identificador del administrador
     * @param nombre nombre para mostrar
     * @param correo correo electrónico (login/identificador)
     */
    public Administrador(Integer id, String nombre, String correo) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
    }

    // --------------------------------------------------------------------
    // Getters y Setters
    // --------------------------------------------------------------------

    /** @return identificador del administrador. */
    public Integer getId() { return id; }

    /** @param id identificador del administrador. */
    public void setId(Integer id) { this.id = id; }

    /** @return nombre del administrador. */
    public String getNombre() { return nombre; }

    /** @param nombre nombre del administrador. */
    public void setNombre(String nombre) { this.nombre = nombre; }

    /** @return correo electrónico del administrador. */
    public String getCorreo() { return correo; }

    /** @param correo correo electrónico del administrador. */
    public void setCorreo(String correo) { this.correo = correo; }

}
