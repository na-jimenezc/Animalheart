package com.animalheart.animalheart.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Tratamiento {

    @Id
    @GeneratedValue
    private Long id;

    private LocalDate fecha;
    private int cantidadUsada;
    private String nombreMedicamento;
    private String nombreVeterinario;
    private String nombreMascota;

    public Tratamiento() {}
    public Tratamiento(LocalDate fecha, int cantidadUsada,
                       String nombreMedicamento, String nombreVeterinario,
                       String nombreMascota) {
        this.fecha = fecha;
        this.cantidadUsada = cantidadUsada;
        this.nombreMedicamento = nombreMedicamento;
        this.nombreVeterinario = nombreVeterinario;
        this.nombreMascota = nombreMascota;
    }

    public Tratamiento(Long id, LocalDate fecha, int cantidadUsada,
                       String nombreMedicamento, String nombreVeterinario,
                       String nombreMascota) {
        this.id = id;
        this.fecha = fecha;
        this.cantidadUsada = cantidadUsada;
        this.nombreMedicamento = nombreMedicamento;
        this.nombreVeterinario = nombreVeterinario;
        this.nombreMascota = nombreMascota;
    }
    
}
