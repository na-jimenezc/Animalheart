package com.animalheart.animalheart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Cliente {

    @Id
    @GeneratedValue
    private Long id;

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

    public Cliente(Long id,String cedula, String nombre, String correo, String celular) {
            
            this.cedula = cedula;
            this.nombre = nombre;
            this.correo = correo;
            this.celular = celular;
    }

}
