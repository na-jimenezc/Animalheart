package com.animalheart.animalheart.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Controller;

import com.animalheart.animalheart.repository.*;

import jakarta.transaction.Transactional;

@Controller
@Transactional
public class DatabaseInit implements ApplicationRunner {

    @Autowired
    VeterinarioRepository veterinarioRepository;
    @Autowired
    AdministradorRepository administradorRepository;

    @Override
    public void run(org.springframework.boot.ApplicationArguments args) throws Exception {

        //Inicializar datos para veterinarios
        veterinarioRepository.save(new Veterinario("Dr. Juan Pérez", "Cirugía", "juanPerez", "123", "/IMAGES/drJuan.jpeg", 1, 100));
        veterinarioRepository.save(new Veterinario("Dra. Laura Gómez", "Dermatología", "lauraGomez", "123", "/IMAGES/draLaura.jpeg", 1, 85));
    
        //Inicializar datos para administradores
        administradorRepository.save(new Administrador("Administrador", "admin@animalheart.com", "admin123"));

        //Inicializar datos para mascotas

        //Inicializar datos para clientes

        //Inicializar datos para medicamentos

        //Inicializar datos para tratamientos

    }
}
