package com.animalheart.animalheart.repository;

import org.springframework.stereotype.Repository;

import com.animalheart.animalheart.model.Veterinario;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface VeterinarioRepository extends JpaRepository<Veterinario, Long> {

    Veterinario findByNombreUsuarioAndContrasenia(String nombreUsuario, String contrasenia);
    List<Veterinario> findByActivo(int activo);

}
