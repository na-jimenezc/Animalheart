package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Cliente;
import java.util.List;

public interface ClienteService {
    List<Cliente> obtenerTodos();
    Cliente obtenerPorCedula(String cedula);
    void crear(Cliente c);
    void eliminarPorCedula(String cedula);
}
