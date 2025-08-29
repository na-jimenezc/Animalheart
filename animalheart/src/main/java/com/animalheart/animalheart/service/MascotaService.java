package com.animalheart.animalheart.service;

import java.util.List;

import com.animalheart.animalheart.model.Mascota;

public interface MascotaService {
    List<Mascota> obtenerTodasMascotas();
    Mascota obtenerMascotaPorId(Long id);
    //boolean verificarAccesoVeterinario(Long idMas, Long idVet);
    //List<Mascota> obtenerMascotasPorVeterinario(Long id);
    Mascota guardarMascota(Mascota mascota);
    void eliminarMascota(Long id);
    void eliminarMascotaHard(Long id);
    Mascota actualizarMascota(Long id,
                          String nombre,
                          String tipo,
                          String raza,
                          String enfermedad,
                          String fotoURL);
    List<Mascota> obtenerMascotasPorClienteId(Long clienteId);  // Cambiar "Clienteld" por "ClienteId"
    void desactivarMascota(Long id);
    public Mascota registrarMascota(Mascota mascota);

}
