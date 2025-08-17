package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.service.MascotaService;
import com.animalheart.animalheart.service.VeterinarioService;
import com.animalheart.animalheart.entities.Veterinario;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class VeterinarioController {

    private final MascotaService mascotaService;
    private final VeterinarioService veterinarioService;

    public VeterinarioController(VeterinarioService veterinarioService, MascotaService mascotaService) {
        this.veterinarioService = veterinarioService;
        this.mascotaService = mascotaService;
    }

    @GetMapping("/login-veterinario")
    public String mostrarLoginForm() {
        return "login-veterinario";
    }

    @PostMapping("/login-veterinario")
        public String procesarLogin(
                @RequestParam("nombreUsuario") String nombreUsuario,
                @RequestParam("contrasenia") String contrasenia,
                Model model) {

            Veterinario veterinario = veterinarioService.validarVeterinario(nombreUsuario, contrasenia);

           if (veterinario != null) {
                return "redirect:/mascotas"; 
            } else {
                model.addAttribute("error", "Credenciales incorrectas");
                return "login-veterinario";
            }
        }

}