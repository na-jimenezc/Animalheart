package com.animalheart.animalheart.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import com.animalheart.animalheart.model.Cliente;
import com.animalheart.animalheart.model.Veterinario;
import com.animalheart.animalheart.repository.ClienteRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class ClienteServiceImpl implements ClienteService {

    @Autowired
    private VeterinarioService veterinarioService;

    private final ClienteRepository repo;
    public ClienteServiceImpl(ClienteRepository repo) { this.repo = repo; }
    @Override
    public List<Cliente> obtenerTodos() { return repo.findAll(); }
    @Override
    public Cliente obtenerPorCedula(String cedula) { return repo.findByCedula(cedula); }
    @Override
    public void crear(Cliente c) { repo.save(c); }
    @Override
    public void eliminarPorCedula(String cedula) { repo.deleteByCedula(cedula); }

    @Override
    public Cliente obtenerClientePorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<Cliente> obtenerClientesPorVeterinario(Long idVet) {
        return repo.findByVeterinarios_Id(idVet);
    }

    @Override
    public Cliente guardarCliente(Cliente cliente) {
        return repo.save(cliente);
    }

    @Override
    public boolean existeClientePorCedula(String cedula) {
        return repo.findByCedula(cedula) != null;
    }

    @Override
    @Transactional
    public Cliente guardarClienteConVeterinario(Cliente cliente, Veterinario veterinario) {

        Cliente clienteGuardado = repo.save(cliente);
        

        if (clienteGuardado.getVeterinarios() == null) {
            clienteGuardado.setVeterinarios(new ArrayList<>());
        }
        clienteGuardado.getVeterinarios().add(veterinario);
        

        if (veterinario.getClientes() == null) {
            veterinario.setClientes(new ArrayList<>());
        }
        veterinario.getClientes().add(clienteGuardado);
        

        repo.save(clienteGuardado);
        veterinarioService.guardarVeterinario(veterinario);
        
        return clienteGuardado;
    }
    
}
