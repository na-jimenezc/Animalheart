package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Veterinario;
import com.animalheart.animalheart.repository.VeterinarioRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VeterinarioServiceImpl implements VeterinarioService {

    private final VeterinarioRepository veterinarioRepository;

    public VeterinarioServiceImpl(VeterinarioRepository veterinarioRepository) {
        this.veterinarioRepository = veterinarioRepository;
    }

    @Override
    public List<Veterinario> obtenerTodos() {
        return veterinarioRepository.findAll();
    }

    @Override
    public Veterinario validarVeterinario(String nombreUsuario, String contrasenia) {
        return veterinarioRepository.buscarPorCredenciales(nombreUsuario, contrasenia);
    }
}