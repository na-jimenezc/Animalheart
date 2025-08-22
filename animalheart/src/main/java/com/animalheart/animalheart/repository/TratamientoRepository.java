package com.animalheart.animalheart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.animalheart.animalheart.model.Tratamiento;

@Repository
public interface TratamientoRepository extends JpaRepository<Tratamiento, Long> {
    
    
}