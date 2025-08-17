package com.animalheart.animalheart.entities;

/**
 * Entidad del dominio que representa a una Mascota.
 *
 * Es un POJO simple usado por los controladores/vistas. En este sprint
 * los datos provienen de un repositorio en memoria; más adelante pueden
 * mapearse a una entidad JPA.
 *
 * Las imágenes se manejan como URL (String),
 * por lo que este objeto expone {@code fotoURL} para que la vista
 * pueda hacer {@code <img src="...">} directamente.
 */
public class Mascota {

    /** Identificador único de la mascota (clave técnica). */
    private Integer id;

    /** Nombre de la mascota. */
    private String nombre;

    /** Raza. */
    private String raza;

    /** Edad expresada en años. */
    private Integer edad;

    /** Tipo de mascota. */
    private String tipo;

    /** Enfermedad actual o condición relevante (puede ser "Ninguna"). */
    private String enfermedad;

    /** Peso aproximado en kilogramos. */
    private Double peso;

    /** Identificador del dueño asociado. */
    private Integer idDueno;

    /**
     * URL pública de la foto de la mascota.
     * Se usa directamente en la vista.
     */
    private String fotoURL;

    // ------------------------------------------------------------
    // Constructores
    // ------------------------------------------------------------

    /** Constructor vacío requerido por frameworks y útil para binders. */
    public Mascota() {}

    /**
     * Constructor de conveniencia para poblar datos de prueba.
     */
    @SuppressWarnings("java:S107")
    public Mascota(Integer id, String nombre, String raza, Integer edad,
                   String tipo, String enfermedad, Double peso,
                   Integer idDueno, String fotoURL) {
        this.id = id;
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
        this.tipo = tipo;
        this.enfermedad = enfermedad;
        this.peso = peso;
        this.idDueno = idDueno;
        this.fotoURL = fotoURL;
    }

    // ------------------------------------------------------------
    // Getters y Setters (necesarios para Thymeleaf / binding MVC)
    // ------------------------------------------------------------

    /** @return id único de la mascota. */
    public Integer getId() { return id; }

    /** @param id id único de la mascota. */
    public void setId(Integer id) { this.id = id; }

    /** @return nombre de la mascota. */
    public String getNombre() { return nombre; }

    /** @param nombre nombre de la mascota. */
    public void setNombre(String nombre) { this.nombre = nombre; }

    /** @return raza de la mascota. */
    public String getRaza() { return raza; }

    /** @param raza raza de la mascota. */
    public void setRaza(String raza) { this.raza = raza; }

    /** @return edad en años. */
    public Integer getEdad() { return edad; }

    /** @param edad edad en años. */
    public void setEdad(Integer edad) { this.edad = edad; }

    /** @return tipo de mascota. */
    public String getTipo() { return tipo; }

    /** @param tipo tipo de mascota. */
    public void setTipo(String tipo) { this.tipo = tipo; }

    /** @return enfermedad o condición actual. */
    public String getEnfermedad() { return enfermedad; }

    /** @param enfermedad enfermedad o condición actual. */
    public void setEnfermedad(String enfermedad) { this.enfermedad = enfermedad; }

    /** @return peso en kilogramos. */
    public Double getPeso() { return peso; }

    /** @param peso peso en kilogramos. */
    public void setPeso(Double peso) { this.peso = peso; }

    /** @return identificador del dueño. */
    public Integer getIdDueno() { return idDueno; }

    /** @param idDueno identificador del dueño. */
    public void setIdDueno(Integer idDueno) { this.idDueno = idDueno; }

    /** @return URL de la foto de la mascota. */
    public String getFotoURL() { return fotoURL; }

    /** @param fotoURL URL de la foto de la mascota. */
    public void setFotoURL(String fotoURL) { this.fotoURL = fotoURL; }

}
