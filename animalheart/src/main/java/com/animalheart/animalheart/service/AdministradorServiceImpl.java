package com.animalheart.animalheart.service;

import org.springframework.stereotype.Service;
import com.animalheart.animalheart.model.Administrador;
import com.animalheart.animalheart.repository.AdministradorRepository;

@Service
public class AdministradorServiceImpl implements AdministradorService {

    private final AdministradorRepository administradorRepository;

    public AdministradorServiceImpl(AdministradorRepository administradorRepository) {
        this.administradorRepository = administradorRepository;
    }

    @Override
    public boolean validar(String correo, String clave) {
        Administrador admin = administradorRepository.findByCorreo(correo);
        return admin != null && admin.getClave().equals(clave);
    }

    @Override
    public Administrador obtenerPorCorreo(String correo) {
        return administradorRepository.findByCorreo(correo);
    }
}