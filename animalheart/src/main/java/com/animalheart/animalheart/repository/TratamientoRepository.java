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
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Tratamiento t WHERE t.mascota.cliente.id = :clienteId")
    void deleteByClienteId(@Param("clienteId") Long clienteId);
    
}