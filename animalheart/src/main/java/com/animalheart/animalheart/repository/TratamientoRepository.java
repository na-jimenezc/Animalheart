package com.animalheart.animalheart.repository;


import com.animalheart.animalheart.entities.Tratamiento;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class TratamientoRepository {

    private static final List<Tratamiento> TRATAMIENTOS = new ArrayList<>();

    static {
        TRATAMIENTOS.add(new Tratamiento(LocalDate.now(), 2, "Amoxicilina", "Dra. Rodríguez", "Max"));
        TRATAMIENTOS.add(new Tratamiento(LocalDate.now().minusDays(1), 1, "Ivermectina", "Dr. López", "Luna"));
        TRATAMIENTOS.add(new Tratamiento(LocalDate.now().minusDays(3), 3, "Ketoprofeno", "Dra. Rodríguez", "Max"));
        TRATAMIENTOS.add(new Tratamiento(LocalDate.now().minusWeeks(1), 1, "Metronidazol", "Dr. Gómez", "Toby"));
        TRATAMIENTOS.add(new Tratamiento(LocalDate.now().minusDays(2), 2, "Carprofeno", "Dr. López", "Bella"));
    }

    public List<Tratamiento> findAll() {
        return TRATAMIENTOS;
    }

    public List<Tratamiento> findByMascota(String nombreMascota) {
        List<Tratamiento> resultado = new ArrayList<>();
        for (Tratamiento t : TRATAMIENTOS) {
            if (t.getNombreMascota().equalsIgnoreCase(nombreMascota)) {
                resultado.add(t);
            }
        }
        return resultado;
    }

    public void save(Tratamiento tratamiento) {
        TRATAMIENTOS.add(tratamiento);
    }
    
}