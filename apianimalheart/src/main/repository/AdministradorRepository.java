package com.animalheart.animalheart.repository;

import com.animalheart.animalheart.model.Administrador;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    Administrador findByCorreo(String correo);
}
