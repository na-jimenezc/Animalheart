package com.animalheart.animalheart.service.serviceInterface;

import com.animalheart.animalheart.model.Administrador;

public interface AdministradorService {

    boolean validar(String correo, String clave);
    Administrador obtenerPorCorreo(String correo);
    
}
