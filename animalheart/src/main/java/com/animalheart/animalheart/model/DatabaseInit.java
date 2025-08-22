package com.animalheart.animalheart.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Controller;

import com.animalheart.animalheart.repository.VeterinarioRepository;

import jakarta.transaction.Transactional;

@Controller
@Transactional
public class DatabaseInit implements ApplicationRunner {

    @Autowired
    VeterinarioRepository veterinarioRepository;

    @Override
    public void run(org.springframework.boot.ApplicationArguments args) throws Exception {

        veterinarioRepository.save(new Veterinario("Dr. Juan Pérez", "Cirugía", "juanPerez", "123", "/IMAGES/drJuan.jpeg", 1, 100));
        veterinarioRepository.save(new Veterinario("Dra. Laura Gómez", "Dermatología", "lauraGomez", "123", "/IMAGES/draLaura.jpeg", 1, 85));
    
    }
}
