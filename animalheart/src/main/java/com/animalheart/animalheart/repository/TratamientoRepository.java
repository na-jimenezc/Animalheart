package com.animalheart.animalheart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.animalheart.animalheart.model.Tratamiento;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TratamientoRepository extends JpaRepository<Tratamiento, Long> {
    
    // Borra todos los tratamientos de las mascotas de un cliente (JPQL, sin nombres de columnas)
    @Modifying
    @Transactional
    @Query("DELETE FROM Tratamiento t WHERE t.mascota.cliente.id = :clienteId")
    void deleteByClienteId(@Param("clienteId") Long clienteId);
    
}