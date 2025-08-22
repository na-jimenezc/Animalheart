package com.animalheart.animalheart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.animalheart.animalheart.model.Mascota;


@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {

}
