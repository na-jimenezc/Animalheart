package com.animalheart.animalheart.entities;

import java.time.LocalDate;

/**
 * Entidad que representa un tratamiento administrado a una mascota.
 * 
 * Cada tratamiento contiene información básica, sin referencias directas.
 */
public class Tratamiento {

    /** Fecha en que se aplicó el tratamiento. */
    private LocalDate fecha;

    /** Cantidad del medicamento usado. */
    private int cantidadUsada;

    /** Nombre del medicamento suministrado. */
    private String nombreMedicamento;

    /** Nombre del veterinario que aplicó el tratamiento. */
    private String nombreVeterinario;

    /** Nombre de la mascota que recibió el tratamiento. */
    private String nombreMascota;

    // ------------------------------------------------------------
    // Constructores
    // ------------------------------------------------------------

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

    // ------------------------------------------------------------
    // Getters y Setters
    // ------------------------------------------------------------

    public LocalDate getFecha() { return fecha; }

    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public int getCantidadUsada() { return cantidadUsada; }

    public void setCantidadUsada(int cantidadUsada) { this.cantidadUsada = cantidadUsada; }

    public String getNombreMedicamento() { return nombreMedicamento; }

    public void setNombreMedicamento(String nombreMedicamento) { this.nombreMedicamento = nombreMedicamento; }

    public String getNombreVeterinario() { return nombreVeterinario; }

    public void setNombreVeterinario(String nombreVeterinario) { this.nombreVeterinario = nombreVeterinario; }

    public String getNombreMascota() { return nombreMascota; }

    public void setNombreMascota(String nombreMascota) { this.nombreMascota = nombreMascota; }
}
