package com.animalheart.animalheart.entities;

public class Cliente {

    private String cedula;
    private String nombre;
    private String correo;
    private String celular;

    public Cliente() {}
    public Cliente(String cedula, String nombre, String correo, String celular) {
        
        this.cedula = cedula;
        this.nombre = nombre;
        this.correo = correo;
        this.celular = celular;
    }

    public String getCedula() { return cedula; }
    public void setCedula(String cedula) { this.cedula = cedula; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public String getCelular() { return celular; }
    public void setCelular(String celular) { this.celular = celular; }
    
}
