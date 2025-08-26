package com.animalheart.animalheart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.animalheart.animalheart.model.Mascota;
import java.util.List;



@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {

    //Obtener mascotas por veterinario
    @Query("SELECT DISTINCT m FROM Mascota m " +
           "JOIN FETCH m.cliente c " +
           "JOIN FETCH c.veterinarios v " +
           "WHERE v.id = :veterinarioId")
    List<Mascota> findByVeterinarioId(@Param("veterinarioId") Long veterinarioId);

    //Obtener mascotas por veterinario incluyendo tratamientos
    @Query("SELECT DISTINCT m FROM Mascota m " +
           "LEFT JOIN m.cliente c " +
           "LEFT JOIN c.veterinarios v " +
           "LEFT JOIN m.tratamientos t " +
           "LEFT JOIN t.veterinario tv " +
           "WHERE v.id = :veterinarioId OR tv.id = :veterinarioId")
    List<Mascota> findByVeterinarioIdIncluyendoTratamientos(@Param("veterinarioId") Long veterinarioId);
    @Query("SELECT m FROM Mascota m WHERE m.cliente.id = :clienteId")
       List<Mascota> findByClienteId(@Param("clienteId") Long clienteId);
}
