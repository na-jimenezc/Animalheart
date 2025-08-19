package com.animalheart.animalheart.entities;

/**
 * Entidad del dominio que representa a un Cliente (Dueño).
 * 
 * Este POJO es usado por los controladores/vistas. Los datos
 * provienen de un repositorio en memoria.
 */
public class Cliente {

    /** Identificador único del cliente (cédula). */
    private String cedula;

    /** Nombre completo del cliente. */
    private String nombre;

    /** Correo electrónico del cliente. */
    private String correo;

    /** Número de celular del cliente. */
    private String celular;

    // ------------------------------------------------------------
    // Constructores
    // ------------------------------------------------------------

    /** Constructor vacío requerido por frameworks y binders. */
    public Cliente() {}

    /**
     * Constructor para inicializar todos los campos.
     */
    public Cliente(String cedula, String nombre, String correo, String celular) {
        
        this.cedula = cedula;
        this.nombre = nombre;
        this.correo = correo;
        this.celular = celular;
    }

    // ------------------------------------------------------------
    // Getters y Setters
    // ------------------------------------------------------------

    public String getCedula() { return cedula; }

    public void setCedula(String cedula) { this.cedula = cedula; }

    public String getNombre() { return nombre; }

    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }

    public void setCorreo(String correo) { this.correo = correo; }

    public String getCelular() { return celular; }

    public void setCelular(String celular) { this.celular = celular; }
}
