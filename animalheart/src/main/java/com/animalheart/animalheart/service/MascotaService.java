package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Mascota;
import java.util.List;

public interface MascotaService {

    List<Mascota> obtenerTodasMascotas();
    Mascota obtenerMascotaPorId(Integer id);
    
}
