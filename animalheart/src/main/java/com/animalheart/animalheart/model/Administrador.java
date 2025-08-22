package com.animalheart.animalheart.model;

import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;
import jakarta.persistence.CascadeType;
import java.util.List;



@Entity
public class Administrador{

    @Id
    @GeneratedValue
    private Long id;
    private String nombre;
    private String correo;
    private String clave;

    //CREACIÓN DE TABLA INTERMEDIA PARA QUE MUCHOS VETERINARIOS PUEDAN SER GESTIONADOS POR MUCHOS ADMINISTRADORES
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "administrador_veterinario",
        joinColumns = @JoinColumn(name = "administrador_id"),
        inverseJoinColumns = @JoinColumn(name = "veterinario_id")
    )
    private List<Veterinario> veterinarios = new ArrayList<>();

    public Administrador() {}

    public Administrador(Long id, String nombre, String correo, String clave) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.clave = clave;
    }

    public Administrador(String nombre, String correo, String clave) {
        this.nombre = nombre;
        this.correo = correo;
        this.clave = clave;
    }

    public void agregarVeterinario(Veterinario veterinario) {
        veterinarios.add(veterinario);
        veterinario.getAdministradores().add(this);
    }

    public void removerVeterinario(Veterinario veterinario) {
        veterinarios.remove(veterinario);
        veterinario.getAdministradores().remove(this);
    }

    //TODO LO DE DATA, ESTABA DANDO PROBLEMAS CON LAS RELACIONES
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public List<Veterinario> getVeterinarios() {
        return veterinarios;
    }

    public void setVeterinarios(List<Veterinario> veterinarios) {
        this.veterinarios = veterinarios;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Administrador that = (Administrador) o;

        return id != null ? id.equals(that.id) : that.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Administrador{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", correo='" + correo + '\'' +
                ", clave='" + clave + '\'' +
                '}';
    }

}
