package com.animalheart.animalheart.repository;

import com.animalheart.animalheart.entities.Mascota;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MascotaRepository {

    private final List<Mascota> mascotas = new ArrayList<>();

    /*Datos quemados*/
    public MascotaRepository() {
        mascotas.add(new Mascota(1, "Firulais", "Criollo", 3, 25.4f, "Ninguna", "/IMAGES/firulais.jpg", true, 101));
        mascotas.add(new Mascota(2, "Roberto", "Persa", 2, 4.8f, "VIH", "/IMAGES/roberto.jpeg", false, 102));
        mascotas.add(new Mascota(3, "Rocky", "Criollo", 5, 30.2f, "Patita torcida", "/IMAGES/rocky.jpeg", true, 103));
    }

    /*Para retornar todas las mascotas*/
    public List<Mascota> findAll() {
        return mascotas;
    }

    /*Para retornar mascota por ID*/
    public Mascota findById(Integer id) {
        return mascotas.stream()
                .filter(m -> m.getId().equals(id))
                .findFirst()
                .orElse(null); 
    }
}