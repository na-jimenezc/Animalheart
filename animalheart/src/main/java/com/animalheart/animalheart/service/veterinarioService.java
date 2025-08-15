package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Veterinario;
import com.animalheart.animalheart.repository.veterinarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class veterinarioService {

    private final veterinarioRepository veterinarioRepository;

    public veterinarioService(veterinarioRepository veterinarioRepository) {
        this.veterinarioRepository = veterinarioRepository;
    }

    public List<Veterinario> obtenerTodos() {
        return veterinarioRepository.findAll();
    }
}
