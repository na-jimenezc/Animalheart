package com.animalheart.animalheart.service;

import com.animalheart.animalheart.model.Mascota;
import com.animalheart.animalheart.repository.MascotaRepository;

import jakarta.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MascotaServiceImpl implements MascotaService {

    private final MascotaRepository mascotaRepository;
    

    public MascotaServiceImpl(MascotaRepository mascotaRepository) {
        this.mascotaRepository = mascotaRepository;
    }

    @Override
    public List<Mascota> obtenerTodasMascotas() {
        return mascotaRepository.findAll();
    }

    @Override
    public Mascota obtenerMascotaPorId(Long id) {
        return mascotaRepository.findById(id).orElse(null);
    }


    /*@Override YA NO ES NECESARIO VERIFICAR ESTE ACCESO
    public boolean verificarAccesoVeterinario(Long mascotaId, Long veterinarioId) {
        Mascota mascota = mascotaRepository.findById(mascotaId).orElse(null);
        if (mascota == null || mascota.getCliente() == null) {
            return false;
        }
        
        return mascota.getCliente().getVeterinarios().stream()
                .anyMatch(v -> v.getId().equals(veterinarioId));
    }*/

    @Override
    public Mascota guardarMascota(Mascota mascota) {
        return mascotaRepository.save(mascota);
    }

    //Método alterno al save porque puede totear vainas si nos metemos con el otro
    @Override
    public Mascota registrarMascota(Mascota mascota) {
        if (mascota.getEnfermedad() == null || 
            mascota.getEnfermedad().trim().isEmpty() || 
            mascota.getEnfermedad().equalsIgnoreCase("Ninguna")) {
            
            mascota.setEstado("Sano");
        } else {
            mascota.setEstado("Enfermo");
        }

        mascota.setActivo(true);

        return mascotaRepository.save(mascota);
    }
    
    @Override
    public void eliminarMascota(Long id) {
        mascotaRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void eliminarMascotaHard(Long id) {
        mascotaRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Mascota actualizarMascota(Long id,
                                    String nombre,
                                    String tipo,
                                    String raza,
                                    String enfermedad,
                                    String fotoURL) {
        Mascota existente = mascotaRepository.findById(id).orElseThrow();

        if (nombre != null && !nombre.isBlank()) existente.setNombre(nombre);
        if (tipo != null && !tipo.isBlank()) existente.setTipo(tipo);
        if (raza != null && !raza.isBlank()) existente.setRaza(raza);
        if (enfermedad != null) existente.setEnfermedad(enfermedad);
        if (fotoURL != null)    existente.setFotoURL(fotoURL);

        return mascotaRepository.save(existente);
    }
    @Override
    public List<Mascota> obtenerMascotasPorClienteId(Long clienteId) {
        List<Mascota> mascotas = mascotaRepository.findByClienteId(clienteId);
        System.out.println("Mascotas encontradas: " + mascotas.size());
        return mascotas;
    }

    @Override
    @Transactional
    public void desactivarMascota(Long id) {
        Mascota mascota = mascotaRepository.findById(id).orElseThrow();
        mascota.setActivo(false);
        mascotaRepository.save(mascota);
    }

    /*Para los temas de paginación */
    public Page<Mascota> obtenerMascotasPaginadas(Pageable pageable) {
        return mascotaRepository.findAll(pageable);
    }


}
