package com.animalheart.animalheart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Veterinario {

    @Id
    @GeneratedValue
    private Long id;

    private String nombre;
    private String especialidad;
    private String nombreUsuario;
    private String contrasenia;
    private String imagen;
    private int activo;
    private int consultas;

    public Veterinario() {}

    public Veterinario(String nombre, String especialidad,
                       String nombreUsuario, String contrasenia,
                       String imagen, int activo, int consultas) {
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
        this.imagen = imagen;
        this.activo = activo;
        this.consultas = consultas;
    }

    
    public Veterinario(Long id, String nombre, String especialidad,
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
}
