package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.model.Mascota;
import com.animalheart.animalheart.service.MascotaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/mascotas")
public class MascotaController {

    @Autowired
    MascotaService mascotaService;

    @GetMapping
    public String listarMascotas(Model model) {
        model.addAttribute("mascotas", mascotaService.obtenerTodasMascotas());
        return "ver-mascotas";
    }

    @GetMapping("/{id}")
    public String verDetalleMascota(@PathVariable Long id, Model model) {
        Mascota mascota = mascotaService.obtenerMascotaPorId(id);
        model.addAttribute("mascota", mascota);
        return "detalle-mascota";
    }
}
