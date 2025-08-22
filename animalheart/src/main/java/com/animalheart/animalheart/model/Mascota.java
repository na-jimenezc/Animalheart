package com.animalheart.animalheart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Mascota {
    @Id
    @GeneratedValue
    private Long id;

    private String nombre;
    private String raza;
    private Integer edad;
    private String tipo;
    private String enfermedad;
    private Double peso;
    private Integer idDueno;
    private String fotoURL;

    public Mascota() {}


    public Mascota(Long id, String nombre, String raza, Integer edad,
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

     public Mascota(String nombre, String raza, Integer edad,
                   String tipo, String enfermedad, Double peso,
                   Integer idDueno, String fotoURL) {
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
        this.tipo = tipo;
        this.enfermedad = enfermedad;
        this.peso = peso;
        this.idDueno = idDueno;
        this.fotoURL = fotoURL;
    }
}
