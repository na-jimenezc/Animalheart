package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Mascota;
import java.util.List;

//Interfaz de Servicio por Mascota
public interface MascotaService {
    List<Mascota> obtenerTodasMascotas();
    Mascota obtenerMascotaPorId(Integer id); 
}