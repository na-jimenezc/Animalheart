package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Mascota;
import com.animalheart.animalheart.repository.MascotaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

//Implementación de la interfaz
@Service
public class MascotaServiceImpl implements MascotaService {

    //Inyección de dependencias
    private final MascotaRepository mascotaRepository;

    public MascotaServiceImpl(MascotaRepository mascotaRepository) {
        this.mascotaRepository = mascotaRepository;
    }

    /*Implementación con ayuda del repository para obtener las mascotas*/
    @Override
    public List<Mascota> obtenerTodasMascotas() {
        return mascotaRepository.findAll();
    }

    /*Implementación con ayuda del repository para obtener una sola mascota*/
    @Override
    public Mascota obtenerMascotaPorId(Integer id) {
        return mascotaRepository.findById(id);
    }
}