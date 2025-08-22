package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.service.MascotaService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/mascotas")
public class MascotaController {

    private final MascotaService mascotaService;

    public MascotaController(MascotaService mascotaService) {
        this.mascotaService = mascotaService;
    }

    @GetMapping
    public String listarMascotas(Model model) {
        model.addAttribute("mascotas", mascotaService.obtenerTodasMascotas());
        return "ver-mascotas";
    }

    @GetMapping("/{id}")
    public String verDetalleMascota(@PathVariable Long id, Model model) {
        model.addAttribute("mascota", mascotaService.obtenerMascotaPorId(id));
        return "detalle-mascota";
    }
}
