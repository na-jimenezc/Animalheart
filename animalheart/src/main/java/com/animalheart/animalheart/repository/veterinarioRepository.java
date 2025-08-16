package com.animalheart.animalheart.repository;

import com.animalheart.animalheart.entities.Veterinario;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class VeterinarioRepository {

    private List<Veterinario> veterinarios = new ArrayList<>();

    public VeterinarioRepository() {
        veterinarios.add(new Veterinario(12345, "Dr. Juan Pérez", "Cirugía", "../static/IMAGES/drJuan.jpeg", 120, 1, "juanPerez", "123" ));
        veterinarios.add(new Veterinario(67890, "Dra. Laura Gómez", "Dermatología", "../static/IMAGES/draLaura.jpeg", 85, 1, "lauraGomez" , "123"));
    }

    public List<Veterinario> findAll() {
        return veterinarios;
    }

    public Veterinario buscarPorCredenciales(String nombreUsuario, String contrasenia) {
        for (Veterinario vet : veterinarios) {
            if (vet.getNombreUsuario().equals(nombreUsuario) && 
                vet.getContrasenia().equals(contrasenia)) {
                return vet;
            }
        }
        return null;
    }
}