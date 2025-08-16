package com.animalheart.animalheart.entities;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class Veterinario{

    private Integer cedula;
    private String nombre;
    private String especialidad;
    private String fotoURL;
    private Integer numeroAtenciones;
    private Integer idAdmin;

    private String nombreUsuario;
    private String contrasenia;
}