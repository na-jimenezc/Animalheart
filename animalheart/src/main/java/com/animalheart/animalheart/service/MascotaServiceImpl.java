package com.animalheart.animalheart.service;

import com.animalheart.animalheart.model.Mascota;
import com.animalheart.animalheart.repository.MascotaRepository;
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

    @Override
    public List<Mascota> obtenerMascotasPorVeterinario(Long veterinarioId) {
        return mascotaRepository.findByVeterinarioId(veterinarioId);
    }

    @Override
    public boolean verificarAccesoVeterinario(Long mascotaId, Long veterinarioId) {
        Mascota mascota = mascotaRepository.findById(mascotaId).orElse(null);
        if (mascota == null || mascota.getCliente() == null) {
            return false;
        }
        
        return mascota.getCliente().getVeterinarios().stream()
                .anyMatch(v -> v.getId().equals(veterinarioId));
    }

    @Override
    public Mascota guardarMascota(Mascota mascota) {
        return mascotaRepository.save(mascota);
    }
    
    @Override
    public void eliminarMascota(Long id) {
        mascotaRepository.deleteById(id);
    }
}
