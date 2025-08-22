package com.animalheart.animalheart.repository;

import org.springframework.stereotype.Repository;

import com.animalheart.animalheart.model.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    void deleteByCedula(String correo);
    Cliente findByCedula(String cedula);
    @Query("SELECT DISTINCT c FROM Cliente c JOIN c.veterinarios v WHERE v.id = :veterinarioId")
    List<Cliente> findByVeterinarios_Id(@Param("veterinarioId") Long veterinarioId);
}
