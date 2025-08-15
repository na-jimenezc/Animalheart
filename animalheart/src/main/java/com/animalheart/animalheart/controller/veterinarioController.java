package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.service.mascotaService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class veterinarioController {

    private final mascotaService mascotaService;

    public veterinarioController(mascotaService mascotaService) {
        this.mascotaService = mascotaService;
    }

    //http://localhost:8080/ver-pacientes
    @GetMapping("/ver-pacientes")
    public String verPacientes(Model model) {
        model.addAttribute("mascotas", mascotaService.obtenerTodas());
        return "ver-pacientes"; 
    }
}

