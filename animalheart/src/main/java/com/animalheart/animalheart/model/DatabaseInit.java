package com.animalheart.animalheart.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Controller;

import com.animalheart.animalheart.repository.*;

import jakarta.transaction.Transactional;

import java.time.LocalDate;

import java.util.Arrays;

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

        //Admin
        Administrador admin1 = new Administrador("Administrador Principal", "admin@animalheart.com", "admin123");
        administradorRepository.save(admin1);

        //Veterinarios
        Veterinario vet1 = new Veterinario("Dr. Juan Pérez", "Cirugía", "juanPerez", "123", "/IMAGES/drJuan.jpeg", 1, 100);
        Veterinario vet2 = new Veterinario("Dra. Laura Gómez", "Dermatología", "lauraGomez", "123", "/IMAGES/draLaura.jpeg", 1, 85);
        Veterinario vet3 = new Veterinario("Dr. Carlos Rodríguez", "Cardiología", "carlosRod", "123", "/IMAGES/drCarlos.jpeg", 1, 120);
        
        veterinarioRepository.saveAll(Arrays.asList(vet1, vet2, vet3));

        //Establecer relación entre admin y veterinarios
        admin1.agregarVeterinario(vet1);
        admin1.agregarVeterinario(vet2);
        admin1.agregarVeterinario(vet3);
        administradorRepository.save(admin1);

        //Clientes
        Cliente cliente1 = new Cliente("123", "Carlos Ruiz", "carlos@gmail.com", "3214567890");
        Cliente cliente2 = new Cliente("456", "Lucía Gómez", "lucia@gmail.com", "3101234567");
        Cliente cliente3 = new Cliente("789", "Mateo Torres", "mateo@gmail.com", "3149876543");
        Cliente cliente4 = new Cliente("101", "Ana López", "ana@gmail.com", "3151122334");
        Cliente cliente5 = new Cliente("202", "Diego Pérez", "diego@gmail.com", "3002233445");

        clienteRepository.saveAll(Arrays.asList(cliente1, cliente2, cliente3, cliente4, cliente5));

        //Establecer relación entre veterinarios y clientes
        vet1.agregarCliente(cliente1);
        vet1.agregarCliente(cliente5);
        vet1.agregarCliente(cliente2);
        vet2.agregarCliente(cliente3);
        vet2.agregarCliente(cliente4);
        vet3.agregarCliente(cliente5);

        veterinarioRepository.saveAll(Arrays.asList(vet1, vet2, vet3));

        //Mascotas y hacer asociaciones con clientes
        Mascota mascota1 = new Mascota("Firulais", "Criollo", 3, "Perro", "Ninguna", 25.4, "/IMAGES/firulais.jpg");
        mascota1.setCliente(cliente1);
        
        Mascota mascota2 = new Mascota("Roberto", "Persa", 2, "Gato", "Ninguna", 4.8, "/IMAGES/roberto.jpeg");
        mascota2.setCliente(cliente2);
        
        Mascota mascota3 = new Mascota("Rocky", "Criollo", 5, "Perro", "Patita torcida", 30.2, "/IMAGES/rocky.jpeg");
        mascota3.setCliente(cliente3);
        
        Mascota mascota4 = new Mascota("Luna", "Siamés", 4, "Gato", "Problemas digestivos", 3.5, "/IMAGES/luna.jpeg");
        mascota4.setCliente(cliente4);
        
        Mascota mascota5 = new Mascota("Max", "Labrador", 2, "Perro", "Alergias", 28.0, "/IMAGES/max.jpeg");
        mascota5.setCliente(cliente5);
        
        mascotaRepository.saveAll(Arrays.asList(mascota1, mascota2, mascota3, mascota4, mascota5));


        //Inicializar datos para medicamentos
        Medicamento med1 = new Medicamento("Amoxicilina", 2.0f, 4.5f, 100, 10);
        Medicamento med2 = new Medicamento("Ivermectina", 1.5f, 3.0f, 80, 5);
        Medicamento med3 = new Medicamento("Ketoprofeno", 2.5f, 5.0f, 60, 12);
        Medicamento med4 = new Medicamento("Metronidazol", 1.8f, 3.5f, 90, 8);
        Medicamento med5 = new Medicamento("Carprofeno", 2.2f, 4.0f, 75, 6);

        medicamentosRepository.saveAll(Arrays.asList(med1, med2, med3, med4, med5));

        //Crear tratamientos y hacer asociaciones
        Tratamiento tratamiento1 = new Tratamiento(LocalDate.now(), 2);
        tratamiento1.setMascota(mascota1);
        tratamiento1.setMedicamento(med1);
        tratamiento1.setVeterinario(vet1);
        
        Tratamiento tratamiento2 = new Tratamiento(LocalDate.now().minusDays(1), 1);
        tratamiento2.setMascota(mascota2);
        tratamiento2.setMedicamento(med2);
        tratamiento2.setVeterinario(vet2);
        
        Tratamiento tratamiento3 = new Tratamiento(LocalDate.now().minusDays(3), 3);
        tratamiento3.setMascota(mascota3);
        tratamiento3.setMedicamento(med3);
        tratamiento3.setVeterinario(vet1);
        
        Tratamiento tratamiento4 = new Tratamiento(LocalDate.now().minusWeeks(1), 1);
        tratamiento4.setMascota(mascota4);
        tratamiento4.setMedicamento(med4);
        tratamiento4.setVeterinario(vet3);
        
        Tratamiento tratamiento5 = new Tratamiento(LocalDate.now().minusDays(2), 2);
        tratamiento5.setMascota(mascota5);
        tratamiento5.setMedicamento(med5);
        tratamiento5.setVeterinario(vet2);
        
        Tratamiento tratamiento6 = new Tratamiento(LocalDate.now().minusDays(5), 1);
        tratamiento6.setMascota(mascota1);
        tratamiento6.setMedicamento(med2);
        tratamiento6.setVeterinario(vet3);
        
        tratamientosRepository.saveAll(Arrays.asList(
            tratamiento1, tratamiento2, tratamiento3, 
            tratamiento4, tratamiento5, tratamiento6
        ));
    

    }}