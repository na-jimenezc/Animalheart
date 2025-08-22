package com.animalheart.animalheart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Medicamento {

    @Id
    @GeneratedValue
    private Long id;

    private String nombre;
    private float precioCompra;
    private float precioVenta;
    private int unidadesDisponibles;
    private int unidadesVendidas;

    public Medicamento() {}
    public Medicamento(String nombre, float precioCompra, float precioVenta,
                       int unidadesDisponibles, int unidadesVendidas) {
        this.nombre = nombre;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.unidadesDisponibles = unidadesDisponibles;
        this.unidadesVendidas = unidadesVendidas;
    }

    public Medicamento(Long id, String nombre, float precioCompra, float precioVenta,
                       int unidadesDisponibles, int unidadesVendidas) {
        this.nombre = nombre;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.unidadesDisponibles = unidadesDisponibles;
        this.unidadesVendidas = unidadesVendidas;
    }

    public void disminuirStock(int cantidad) {
        this.unidadesDisponibles -= cantidad;
        this.unidadesVendidas += cantidad;
    }

    public void aumentarStock(int cantidad) {
        this.unidadesDisponibles += cantidad;
    }
    
}
