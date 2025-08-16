package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Veterinario;
import com.animalheart.animalheart.repository.VeterinarioRepository;
import org.springframework.stereotype.Service;
import java.util.List;

//Implementación de Interfaz del Servicio de Veterinario
@Service
public class VeterinarioServiceImpl implements VeterinarioService {

    private final VeterinarioRepository veterinarioRepository;

    //Inyección del Repository
    public VeterinarioServiceImpl(VeterinarioRepository veterinarioRepository) {
        this.veterinarioRepository = veterinarioRepository;
    }

    /*Obtener todos los veterinarios con ayuda del repository*/
    @Override
    public List<Veterinario> obtenerTodos() {
        return veterinarioRepository.findAll();
    }

    /*Obtener veterinario por credenciales con ayuda del repository*/
    @Override
    public Veterinario validarVeterinario(String nombreUsuario, String contrasenia) {
        return veterinarioRepository.buscarPorCredenciales(nombreUsuario, contrasenia);
    }
}