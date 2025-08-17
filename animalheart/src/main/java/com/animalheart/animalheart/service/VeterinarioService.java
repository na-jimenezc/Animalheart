package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Veterinario;
import java.util.List;

public interface VeterinarioService {
    List<Veterinario> obtenerTodos();
    Veterinario validarVeterinario(String nombreUsuario, String contrasenia);
}