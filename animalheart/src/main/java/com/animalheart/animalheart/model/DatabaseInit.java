package com.animalheart.animalheart.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Controller;

import com.animalheart.animalheart.repository.*;

import jakarta.transaction.Transactional;

import java.time.LocalDate;

@Controller
@Transactional
public class DatabaseInit implements ApplicationRunner {

    @Autowired
    VeterinarioRepository veterinarioRepository;
    @Autowired
    AdministradorRepository administradorRepository;

    @Autowired
    MascotaRepository mascotaRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    MedicamentoRepository medicamentosRepository;

    @Autowired
    TratamientoRepository tratamientosRepository;

    @Override
    public void run(org.springframework.boot.ApplicationArguments args) throws Exception {

        //Inicializar datos para veterinarios
        veterinarioRepository.save(new Veterinario("Dr. Juan Pérez", "Cirugía", "juanPerez", "123", "/IMAGES/drJuan.jpeg", 1, 100));
        veterinarioRepository.save(new Veterinario("Dra. Laura Gómez", "Dermatología", "lauraGomez", "123", "/IMAGES/draLaura.jpeg", 1, 85));
    
        //Inicializar datos para administradores
        administradorRepository.save(new Administrador("Administrador", "admin@animalheart.com", "admin123"));

        //Inicializar datos para mascotas
        mascotaRepository.save(new Mascota(
                "Firulais", "Criollo", 3,
                "Perro", "Ninguna", 25.4, 101, "/IMAGES/firulais.jpg"
        ));

        mascotaRepository.save(new Mascota(
                "Roberto", "Persa", 2,
                "Gato", "Ninguna", 4.8, 102, "/IMAGES/roberto.jpeg"
        ));

        mascotaRepository.save(new Mascota(
                "Rocky", "Criollo", 5,
                "Perro", "Patita torcida", 30.2, 103, "/IMAGES/rocky.jpeg"));

    
        //Inicializar datos para clientes
        clienteRepository.save(new Cliente("123", "Carlos Ruiz", "carlos@gmail.com", "3214567890"));
        clienteRepository.save(new Cliente("456", "Lucía Gómez", "lucia@gmail.com", "3101234567"));
        clienteRepository.save(new Cliente("789", "Mateo Torres", "mateo@gmail.com", "3149876543"));
        clienteRepository.save(new Cliente("101", "Ana López", "ana@gmail.com", "3151122334"));
        clienteRepository.save(new Cliente("202", "Diego Pérez", "diego@gmail.com", "3002233445"));


        //Inicializar datos para medicamentos
        
        medicamentosRepository.save(new Medicamento("Amoxicilina", 2.0f, 4.5f, 100, 10));
        medicamentosRepository.save(new Medicamento("Ivermectina", 1.5f, 3.0f, 80, 5));
        medicamentosRepository.save(new Medicamento("Ketoprofeno", 2.5f, 5.0f, 60, 12));
        medicamentosRepository.save(new Medicamento("Metronidazol", 1.8f, 3.5f, 90, 8));
        medicamentosRepository.save(new Medicamento("Carprofeno", 2.2f, 4.0f, 75, 6));
    
        //Inicializar datos para tratamientos
        tratamientosRepository.save(new Tratamiento(LocalDate.now(), 2, "Amoxicilina", "Dra. Rodríguez", "Max"));
        tratamientosRepository.save(new Tratamiento(LocalDate.now().minusDays(1), 1, "Ivermectina", "Dr. López", "Luna"));
        tratamientosRepository.save(new Tratamiento(LocalDate.now().minusDays(3), 3, "Ketoprofeno", "Dra. Rodríguez", "Max"));
        tratamientosRepository.save(new Tratamiento(LocalDate.now().minusWeeks(1), 1, "Metronidazol", "Dr. Gómez", "Toby"));
        tratamientosRepository.save(new Tratamiento(LocalDate.now().minusDays(2), 2, "Carprofeno", "Dr. López", "Bella"));
    

    }}