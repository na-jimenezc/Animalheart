package com.animalheart.animalheart.repository;

import com.animalheart.animalheart.entities.Veterinario;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class VeterinarioRepository {

    private final List<Veterinario> veterinarios = new ArrayList<>();

    public VeterinarioRepository() {
        veterinarios.add(new Veterinario(
                12345,
                "Dr. Juan Pérez",
                "Cirugía",
                "juanPerez",
                "123",
                "/IMAGES/drJuan.jpeg",
                1,
                100
        ));

        veterinarios.add(new Veterinario(
                67890,
                "Dra. Laura Gómez",
                "Dermatología",
                "lauraGomez",
                "123",
                "/IMAGES/draLaura.jpeg",
                1,
                85
        ));
    }

    public List<Veterinario> findAll() {
        return veterinarios;
    }

    public Veterinario buscarPorCredenciales(String nombreUsuario, String contrasenia) {
        for (Veterinario vet : veterinarios) {
            if (vet.getNombreUsuario().equals(nombreUsuario)
                    && vet.getContrasenia().equals(contrasenia)) {
                return vet;
            }
        }
        return null;
    }

    public List<Veterinario> findAllActivos() {
    return veterinarios.stream()
            .filter(v -> v.getActivo() == 1)
            .toList();
    }

    public Optional<Veterinario> findById(Integer id) {
        return veterinarios.stream()
                .filter(v -> v.getId().equals(id))
                .findFirst();
    }
    
}
