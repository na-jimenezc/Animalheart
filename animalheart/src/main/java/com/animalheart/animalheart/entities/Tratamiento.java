package com.animalheart.animalheart.entities;

import java.time.LocalDate;

public class Tratamiento {

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
