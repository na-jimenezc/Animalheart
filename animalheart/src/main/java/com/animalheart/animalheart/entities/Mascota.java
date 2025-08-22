package com.animalheart.animalheart.entities;

public class Mascota {

    private Integer id;
    private String nombre;
    private String raza;
    private Integer edad;
    private String tipo;
    private String enfermedad;
    private Double peso;
    private Integer idDueno;
    private String fotoURL;

    public Mascota() {}

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

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getRaza() { return raza; }
    public void setRaza(String raza) { this.raza = raza; }
    public Integer getEdad() { return edad; }
    public void setEdad(Integer edad) { this.edad = edad; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getEnfermedad() { return enfermedad; }
    public void setEnfermedad(String enfermedad) { this.enfermedad = enfermedad; }
    public Double getPeso() { return peso; }
    public void setPeso(Double peso) { this.peso = peso; }
    public Integer getIdDueno() { return idDueno; }
    public void setIdDueno(Integer idDueno) { this.idDueno = idDueno; }
    public String getFotoURL() { return fotoURL; }
    public void setFotoURL(String fotoURL) { this.fotoURL = fotoURL; }

}
