package com.animalheart.animalheart.service;

import java.util.List;

import com.animalheart.animalheart.model.Veterinario;

public interface VeterinarioService {

    List<Veterinario> obtenerTodos();
    Veterinario validarVeterinario(String nombreUsuario, String contrasenia);
    List<Veterinario> obtenerVeterinariosActivos();
    Veterinario obtenerVeterinarioPorId(Long id);
    
}
