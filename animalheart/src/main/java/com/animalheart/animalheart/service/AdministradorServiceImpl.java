package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Administrador;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AdministradorServiceImpl implements AdministradorService {

    private static final String ADMIN_EMAIL   = "admin@animalheart.com";
    private static final String ADMIN_CLAVE   = "admin123";
    private static final int    ADMIN_ID      = 1;
    private static final String ADMIN_NOMBRE  = "Administrador";

    private static final Map<String, String> CREDENCIALES = Map.of(
        ADMIN_EMAIL, ADMIN_CLAVE
    );

    private static final Map<String, Administrador> ADMINES = Map.of(
        ADMIN_EMAIL, new Administrador(ADMIN_ID, ADMIN_NOMBRE, ADMIN_EMAIL, ADMIN_CLAVE)
    );

    @Override
    public boolean validar(String correo, String clave) {
        return clave != null && clave.equals(CREDENCIALES.get(correo));
    }

    @Override
    public Administrador obtenerPorCorreo(String correo) {
        return ADMINES.get(correo);
    }

}

