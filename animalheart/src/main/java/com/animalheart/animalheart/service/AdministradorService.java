package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Administrador;

public interface AdministradorService {

    boolean validar(String correo, String clave);
    Administrador obtenerPorCorreo(String correo);
    
}
