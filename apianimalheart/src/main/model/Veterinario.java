package com.animalheart.animalheart.model;

import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.FetchType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import java.util.List;


@Entity
public class Veterinario {

    @Id
    @GeneratedValue
    private Long id;

    private String nombre;
    private String especialidad;
    private String nombreUsuario;
    private String contrasenia;
    private String imagen;
    private int activo;
    private int consultas;

    @ManyToMany(mappedBy = "veterinarios", fetch = FetchType.LAZY)
    private List<Administrador> administradores = new ArrayList<>();

    @OneToMany(mappedBy = "veterinario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Tratamiento> tratamientos = new ArrayList<>();

    public Veterinario() {}

    public Veterinario(String nombre, String especialidad,
                       String nombreUsuario, String contrasenia,
                       String imagen, int activo, int consultas) {
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
        this.imagen = imagen;
        this.activo = activo;
        this.consultas = consultas;
    }

    public Veterinario(Long id, String nombre, String especialidad,
                       String nombreUsuario, String contrasenia,
                       String imagen, int activo, int consultas) {
        this.id = id;
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
        this.imagen = imagen;
        this.activo = activo;
        this.consultas = consultas;
    }

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

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

    public int getConsultas() {
        return consultas;
    }

    public void setConsultas(int consultas) {
        this.consultas = consultas;
    }

    public List<Administrador> getAdministradores() {
        return administradores;
    }

    public void setAdministradores(List<Administrador> administradores) {
        this.administradores = administradores;
    }

    public List<Tratamiento> getTratamientos() {
        return tratamientos;
    }

    public void setTratamientos(List<Tratamiento> tratamientos) {
        this.tratamientos = tratamientos;
    }

}
