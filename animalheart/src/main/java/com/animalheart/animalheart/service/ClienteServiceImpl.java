package com.animalheart.animalheart.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.animalheart.animalheart.entities.Cliente;
import com.animalheart.animalheart.repository.ClienteRepository;

@Service
public class ClienteServiceImpl implements ClienteService {

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
    
}
