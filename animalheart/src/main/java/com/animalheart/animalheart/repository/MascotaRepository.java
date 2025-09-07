package com.animalheart.animalheart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.animalheart.animalheart.model.Mascota;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;



@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {

    /*@Query("SELECT DISTINCT m FROM Mascota m " +
           "JOIN FETCH m.cliente c " +
           "JOIN FETCH c.veterinarios v " +
           "WHERE v.id = :veterinarioId")
    List<Mascota> findByVeterinarioId(@Param("veterinarioId") Long veterinarioId);*/

    @Query("SELECT DISTINCT m FROM Mascota m " +
       "JOIN m.tratamientos t " +
       "JOIN t.veterinario v " +
       "WHERE v.id = :veterinarioId")
       List<Mascota> findByVeterinarioIdIncluyendoTratamientos(@Param("veterinarioId") Long veterinarioId);


    @Query("SELECT m FROM Mascota m WHERE m.cliente.id = :clienteId")
       List<Mascota> findByClienteId(@Param("clienteId") Long clienteId);
       @Modifying
       @Transactional
       @Query("DELETE FROM Mascota m WHERE m.cliente.id = :clienteId")
       void deleteByClienteId(@Param("clienteId") Long clienteId);

}
