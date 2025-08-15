

package com.animalheart.animalheart.entities;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class Mascota{

    private Integer id;
    private String nombre;
    private String raza;
    private int edad;
    private float peso;
    private String enfermedad;
    private String fotoURL;
    private Boolean tipo;
    private Integer idDuenio;


}