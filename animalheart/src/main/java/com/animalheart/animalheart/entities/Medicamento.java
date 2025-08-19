package com.animalheart.animalheart.entities;

/**
 * Entidad del dominio que representa un medicamento.
 * 
 * Esta clase almacena información relevante de inventario,
 * utilizada en tratamientos.
 */
public class Medicamento {

    /** Nombre del medicamento. */
    private String nombre;

    /** Precio de compra unitario. */
    private float precioCompra;

    /** Precio de venta unitario. */
    private float precioVenta;

    /** Unidades disponibles en inventario. */
    private int unidadesDisponibles;

    /** Unidades vendidas acumuladas. */
    private int unidadesVendidas;

    // ------------------------------------------------------------
    // Constructores
    // ------------------------------------------------------------

    public Medicamento() {}

    public Medicamento(String nombre, float precioCompra, float precioVenta,
                       int unidadesDisponibles, int unidadesVendidas) {
        this.nombre = nombre;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.unidadesDisponibles = unidadesDisponibles;
        this.unidadesVendidas = unidadesVendidas;
    }

    // ------------------------------------------------------------
    // Getters y Setters
    // ------------------------------------------------------------

    public String getNombre() { return nombre; }

    public void setNombre(String nombre) { this.nombre = nombre; }

    public float getPrecioCompra() { return precioCompra; }

    public void setPrecioCompra(float precioCompra) { this.precioCompra = precioCompra; }

    public float getPrecioVenta() { return precioVenta; }

    public void setPrecioVenta(float precioVenta) { this.precioVenta = precioVenta; }

    public int getUnidadesDisponibles() { return unidadesDisponibles; }

    public void setUnidadesDisponibles(int unidadesDisponibles) { this.unidadesDisponibles = unidadesDisponibles; }

    public int getUnidadesVendidas() { return unidadesVendidas; }

    public void setUnidadesVendidas(int unidadesVendidas) { this.unidadesVendidas = unidadesVendidas; }

    // ------------------------------------------------------------
    // Métodos funcionales
    // ------------------------------------------------------------

    /**
     * Disminuye el stock y aumenta unidades vendidas.
     * @param cantidad número de unidades a descontar
     */
    public void disminuirStock(int cantidad) {
        this.unidadesDisponibles -= cantidad;
        this.unidadesVendidas += cantidad;
    }

    /**
     * Aumenta el stock.
     * @param cantidad número de unidades a agregar
     */
    public void aumentarStock(int cantidad) {
        this.unidadesDisponibles += cantidad;
    }
}
