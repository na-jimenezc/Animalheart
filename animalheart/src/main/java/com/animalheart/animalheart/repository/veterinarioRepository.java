package com.animalheart.animalheart.repository;

import com.animalheart.animalheart.entities.Veterinario;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class veterinarioRepository {

    private List<Veterinario> veterinarios = new ArrayList<>();

    public veterinarioRepository() {
        veterinarios.add(new Veterinario(12345, "Dr. Juan Pérez", "Cirugía", "../static/IMAGES/drJuan.jpeg", 120, 1));
        veterinarios.add(new Veterinario(67890, "Dra. Laura Gómez", "Dermatología", "../static/IMAGES/draLaura.jpeg", 85, 1));
    }

    public List<Veterinario> findAll() {
        return veterinarios;
    }
}