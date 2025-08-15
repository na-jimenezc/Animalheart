package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Mascota;
import com.animalheart.animalheart.repository.mascotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class mascotaService {

    private final mascotaRepository mascotaRepository;

    public mascotaService(mascotaRepository mascotaRepository) {
        this.mascotaRepository = mascotaRepository;
    }

    public List<Mascota> obtenerTodas() {
        return mascotaRepository.findAll();
    }
}
