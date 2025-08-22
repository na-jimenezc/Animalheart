package com.animalheart.animalheart.repository;

import org.springframework.stereotype.Repository;

import com.animalheart.animalheart.model.Mascota;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class MascotaRepository {

    private final List<Mascota> mascotas = new ArrayList<>();

    public MascotaRepository() {
        mascotas.add(new Mascota(
                "Firulais", "Criollo", 3,
                "Perro", "Ninguna", 25.4, 101, "/IMAGES/firulais.jpg"
        ));
        mascotas.add(new Mascota(
                "Roberto", "Persa", 2,
                "Gato", "Ninguna", 4.8, 102, "/IMAGES/roberto.jpeg"
        ));
        mascotas.add(new Mascota(
                "Rocky", "Criollo", 5,
                "Perro", "Patita torcida", 30.2, 103, "/IMAGES/rocky.jpeg"
        ));
    }

    public List<Mascota> findAll() {
        return mascotas;
    }

    public Optional<Mascota> findById(Long id) {
        return mascotas.stream()
                .filter(m -> m.getId().equals(id))
                .findFirst();
    }

}
