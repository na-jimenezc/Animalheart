package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.model.Veterinario;
import com.animalheart.animalheart.service.serviceInterface.MascotaService;
import com.animalheart.animalheart.service.serviceInterface.VeterinarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;

@Controller
public class VeterinarioController {

    @Autowired
    VeterinarioService veterinarioService;

    @Autowired
    MascotaService mascotaService;

    private static final String VET_AUTH = "VET_AUTH";

    @GetMapping("/login-veterinario")
    public String mostrarLoginForm() {
        return "login-veterinario";
    }

    @PostMapping("/login-veterinario")
    public String procesarLogin(
            @RequestParam("nombreUsuario") String nombreUsuario,
            @RequestParam("contrasenia") String contrasenia,
            Model model,
            HttpSession session) {

        Veterinario veterinario = veterinarioService.validarVeterinario(nombreUsuario, contrasenia);

        if (veterinario != null) {
            session.setAttribute(VET_AUTH, veterinario);
            return "redirect:/mascotas";
        } else {
            model.addAttribute("error", "Credenciales incorrectas");
            return "login-veterinario";
        }
    }
    
    @GetMapping("/logout")
    public String cerrarSesion(HttpSession session) {
        session.removeAttribute(VET_AUTH);
        session.invalidate();
        return "redirect:/login-veterinario";
    }
}