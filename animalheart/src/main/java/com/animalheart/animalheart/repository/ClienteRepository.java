package com.animalheart.animalheart.repository;

import org.springframework.stereotype.Repository;

import com.animalheart.animalheart.model.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    void deleteByCedula(String correo);
    Cliente findByCedula(String cedula);
}
