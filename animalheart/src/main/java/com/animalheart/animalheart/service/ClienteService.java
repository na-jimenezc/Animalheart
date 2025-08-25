package com.animalheart.animalheart.service;

import java.util.List;

import com.animalheart.animalheart.model.Cliente;
import com.animalheart.animalheart.model.Veterinario;

public interface ClienteService {

    List<Cliente> obtenerTodos();
    Cliente obtenerPorCedula(String cedula);
    void crear(Cliente c);
    void eliminarPorCedula(String cedula);
    Cliente obtenerClientePorId(Long id);
    List<Cliente> obtenerClientesPorVeterinario(Long idVet);
     Cliente guardarCliente(Cliente cliente);
    boolean existeClientePorCedula(String cedula);
    Cliente guardarClienteConVeterinario(Cliente cliente, Veterinario veterinario);
    void eliminarClienteHard(Long id);
    Cliente actualizarCliente(Long id,
                          String cedula,
                          String nombres,
                          String correo,
                          String telefono);

}
