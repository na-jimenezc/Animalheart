package com.animalheart.animalheart.entities;

public class Veterinario {

    private Integer id;
    private String nombre;
    private String especialidad;
    private String nombreUsuario;
    private String contrasenia;
    private String imagen;
    private int activo;
    private int consultas;

    public Veterinario() {}

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

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEspecialidad() { return especialidad; }
    public void setEspecialidad(String especialidad) { this.especialidad = especialidad; }
    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }
    public String getContrasenia() { return contrasenia; }
    public void setContrasenia(String contrasenia) { this.contrasenia = contrasenia; }
    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }
    public int getActivo() { return activo; }
    public void setActivo(int activo) { this.activo = activo; }
    public int getConsultas() { return consultas; }
    public void setConsultas(int consultas) { this.consultas = consultas; }

}
