package com.animalheart.animalheart.repository;

import com.animalheart.animalheart.entities.Mascota;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;


@Repository
public class mascotaRepository {

    private List<Mascota> mascotas = new ArrayList<>();

    /*Simulación con datos quemados :D*/
    public mascotaRepository() {
        mascotas.add(new Mascota(1, "Firulais", "Criollo", 3, 25.4f, "Ninguna", "../static/IMAGES/firulais.jpg", true, 101));
        mascotas.add(new Mascota(2, "Roberto", "Persa", 2, 4.8f, "VIH", "../static/IMAGES/roberto.jpeg", false, 102));
        mascotas.add(new Mascota(3, "Rocky", "Criollo", 5, 30.2f, "Patita torcida", "../static/IMAGES/rocky.jpeg", true, 103));
    }

    public List<Mascota> findAll() {
        return mascotas;
    }
}
