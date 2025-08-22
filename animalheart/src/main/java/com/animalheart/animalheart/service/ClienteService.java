package com.animalheart.animalheart.service;

import java.util.List;

import com.animalheart.animalheart.model.Cliente;

public interface ClienteService {

    List<Cliente> obtenerTodos();
    Cliente obtenerPorCedula(String cedula);
    void crear(Cliente c);
    void eliminarPorCedula(String cedula);
    
}
