package com.animalheart.animalheart.entities;

/**
 * Entidad del dominio que representa a un Veterinario.
 *
 * Se usa en:
 *   Login de veterinario (validación por nombreUsuario y contrasenia).
 *   Vistas del administrador: listado (ver-veterinarios.html)
 *       y detalle (detalle-veterinario.html).
 *
 * Notas:
 *   El campo imagen es una URL (String) para mostrar foto.
 *   activo se maneja como int (1 = Activo, 0 = Inactivo) para alinear con las vistas.
 *   consultas (o “atenciones”) es un contador entero para mostrar badges/estadísticas.
 */
public class Veterinario {

    /** Identificador único del veterinario (clave técnica). */
    private Integer id;

    /** Nombre completo para mostrar en las vistas. */
    private String nombre;

    /** Especialidad médica. */
    private String especialidad;

    /** Nombre de usuario para el inicio de sesión del veterinario. */
    private String nombreUsuario;

    /** Contraseña del veterinario. */
    private String contrasenia;

    /**
     * URL de la imagen/foto del veterinario.
     * Se usa directamente en las plantillas.
     */
    private String imagen;

    /**
     * Estado del veterinario.
     * Convención: 1 = Activo, 0 = Inactivo.
     * Esto permite expresiones.
     */
    private int activo;

    /** Número de atenciones realizadas que se muestra como “consultas” o “atenciones”. */
    private int consultas;

    // --------------------------------------------------------------------
    // Constructores
    // --------------------------------------------------------------------

    /** Constructor vacío requerido por frameworks y para data binding. */
    public Veterinario() {}

    /**
     * Constructor de conveniencia para poblar datos de prueba en el repositorio en memoria.
     */
    @SuppressWarnings("java:S107")
    public Veterinario(Integer id, String nombre, String especialidad,
                       String nombreUsuario, String contrasenia,
                       String imagen, int activo, int consultas) {
        this.id = id;
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
        this.imagen = imagen;
        this.activo = activo;
        this.consultas = consultas;
    }

    // --------------------------------------------------------------------
    // Getters y Setters (necesarios para Thymeleaf / binding MVC)
    // --------------------------------------------------------------------

    /** @return identificador del veterinario. */
    public Integer getId() { return id; }

    /** @param id identificador del veterinario. */
    public void setId(Integer id) { this.id = id; }

    /** @return nombre completo del veterinario. */
    public String getNombre() { return nombre; }

    /** @param nombre nombre completo del veterinario. */
    public void setNombre(String nombre) { this.nombre = nombre; }

    /** @return especialidad médica. */
    public String getEspecialidad() { return especialidad; }

    /** @param especialidad especialidad médica. */
    public void setEspecialidad(String especialidad) { this.especialidad = especialidad; }

    /** @return nombre de usuario para login. */
    public String getNombreUsuario() { return nombreUsuario; }

    /** @param nombreUsuario nombre de usuario para login. */
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }

    /** @return contraseña. */
    public String getContrasenia() { return contrasenia; }

    /** @param contrasenia contraseña. */
    public void setContrasenia(String contrasenia) { this.contrasenia = contrasenia; }

    /** @return URL de la imagen del veterinario. */
    public String getImagen() { return imagen; }

    /** @param imagen URL de la imagen del veterinario. */
    public void setImagen(String imagen) { this.imagen = imagen; }

    /** @return estado como entero (1=Activo, 0=Inactivo). */
    public int getActivo() { return activo; }

    /** @param activo estado como entero (1=Activo, 0=Inactivo). */
    public void setActivo(int activo) { this.activo = activo; }

    /** @return número de atenciones realizadas. */
    public int getConsultas() { return consultas; }

    /** @param consultas número de atenciones realizadas. */
    public void setConsultas(int consultas) { this.consultas = consultas; }

}
