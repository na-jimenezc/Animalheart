package com.animalheart.animalheart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Administrador{

    @Id
    @GeneratedValue
    private Long id;
    private String nombre;
    private String correo;

    public Administrador() {}

    public Administrador(Long id, String nombre, String correo, String clave) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
    }

    public Administrador(String nombre, String correo, String clave) {
        this.nombre = nombre;
        this.correo = correo;
    }

}
