package com.animalheart.animalheart.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;

@Entity
public class Tratamiento {

    @Id
    @GeneratedValue
    private Long id;
    private LocalDate fecha;
    private int cantidadUsada;

    //UN TRATAMIENTO ESTÁ ASOCIADO A UNA MASCOTA
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mascota_id")
    private Mascota mascota;

    //UN TRATAMIENTO ESTÁ ASOCIADO A UN MEDICAMENTO
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicamento_id")
    private Medicamento medicamento;

    //UN VETERINARIO PUEDE HACER MUCHOS TRATAMIENTOS
    @ManyToOne
    @JoinColumn(name = "veterinario_id")
    private Veterinario veterinario;

    public Tratamiento() {}
    
    public Tratamiento(LocalDate fecha, int cantidadUsada) {
        this.fecha = fecha;
        this.cantidadUsada = cantidadUsada;
    }

    public Tratamiento(Long id, LocalDate fecha, int cantidadUsada) {
        this.id = id;
        this.fecha = fecha;
        this.cantidadUsada = cantidadUsada;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public int getCantidadUsada() {
        return cantidadUsada;
    }

    public void setCantidadUsada(int cantidadUsada) {
        this.cantidadUsada = cantidadUsada;
    }

    public Mascota getMascota() {
        return mascota;
    }

    public void setMascota(Mascota mascota) {
        this.mascota = mascota;
    }

    public Medicamento getMedicamento() {
        return medicamento;
    }

    public void setMedicamento(Medicamento medicamento) {
        this.medicamento = medicamento;
    }

    public Veterinario getVeterinario() {
        return veterinario;
    }

    public void setVeterinario(Veterinario veterinario) {
        this.veterinario = veterinario;
    }
    
}
