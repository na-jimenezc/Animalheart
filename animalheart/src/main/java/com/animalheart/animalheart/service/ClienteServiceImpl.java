package com.animalheart.animalheart.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import com.animalheart.animalheart.model.Cliente;
import com.animalheart.animalheart.model.Mascota;
import com.animalheart.animalheart.model.Veterinario;
import com.animalheart.animalheart.repository.ClienteRepository;

import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import com.animalheart.animalheart.repository.MascotaRepository;
import com.animalheart.animalheart.repository.TratamientoRepository;


@Service
public class ClienteServiceImpl implements ClienteService {

    @Autowired
    private VeterinarioService veterinarioService;
    @Autowired
    private ClienteRepository clienteRepo;
    @PersistenceContext
    private EntityManager em;
    @Autowired
    private MascotaRepository mascotaRepository;
    @Autowired
    private TratamientoRepository tratamientoRepository;



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
        return clienteRepo.findById(id).orElse(null);
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
    
    @Override
    @Transactional
    public void eliminarClienteHard(Long id) {
    if (id == null || !repo.existsById(id)) return;

    tratamientoRepository.deleteByClienteId(id);

    mascotaRepository.deleteByClienteId(id);

    em.createNativeQuery("DELETE FROM VETERINARIO_CLIENTE WHERE CLIENTE_ID = :id")
      .setParameter("id", id)
      .executeUpdate();

    repo.deleteById(id);
    }


    @Override
    @org.springframework.transaction.annotation.Transactional
    public Cliente actualizarCliente(Long id,
                                    String cedula,
                                    String nombres,
                                    String correo,
                                    String celular) {
        Cliente existente = repo.findById(id).orElseThrow();

        if (cedula   != null && !cedula.isBlank())   existente.setCedula(cedula.trim());
        if (nombres  != null && !nombres.isBlank())  existente.setNombre(nombres.trim());
        if (correo   != null)                         existente.setCorreo(correo.trim());
        if (celular != null)                         existente.setCelular(celular.trim());

        return repo.save(existente);
    }
    @Override
    public List<Mascota> obtenerMascotasPorClienteId(Long clienteId) {
    Cliente cliente = repo.findById(clienteId).orElse(null);
    if (cliente != null) {
        return cliente.getMascotas();
    }
    return List.of();
    }

}