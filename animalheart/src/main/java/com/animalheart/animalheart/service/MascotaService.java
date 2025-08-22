package com.animalheart.animalheart.service;

import java.util.List;

import com.animalheart.animalheart.model.Mascota;

public interface MascotaService {
    List<Mascota> obtenerTodasMascotas();
    Mascota obtenerMascotaPorId(Long id);
}
