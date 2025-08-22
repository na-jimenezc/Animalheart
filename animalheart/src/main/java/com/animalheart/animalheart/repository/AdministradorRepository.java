package com.animalheart.animalheart.repository;

import java.util.ArrayList;
import java.util.List;

import com.animalheart.animalheart.model.Administrador;

public class AdministradorRepository {

    private static final List<Administrador> ADMIN = new ArrayList<>();

    static {
        ADMIN.add(new Administrador("Claudia Ramírez", "claudia@animalheart.com", "123"));
    }

    public List<Administrador> findAll() {
        return ADMIN;
    }

    public Administrador findById(Long id) {
        for (Administrador a : ADMIN) {
            if (a.getId().equals(id)) {
                return a;
            }
        }
        return null;
    }

    public Administrador findByCorreo(String correo) {
        for (Administrador a : ADMIN) {
            if (a.getCorreo().equalsIgnoreCase(correo)) {
                return a;
            }
        }
        return null;
    }
    
}
