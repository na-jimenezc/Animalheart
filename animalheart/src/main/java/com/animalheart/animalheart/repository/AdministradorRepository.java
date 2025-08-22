package com.animalheart.animalheart.repository;

import com.animalheart.animalheart.entities.Administrador;

import java.util.ArrayList;
import java.util.List;

public class AdministradorRepository {

    private static final List<Administrador> ADMIN = new ArrayList<>();

    static {
        ADMIN.add(new Administrador(101, "Claudia Ramírez", "claudia@animalheart.com", "123"));
    }

    public List<Administrador> findAll() {
        return ADMIN;
    }

    public Administrador findById(Integer id) {
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
