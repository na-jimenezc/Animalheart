package com.animalheart.animalheart.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ContactoController {

    @GetMapping("/contacto")
    public String mostrarFormulario(@RequestParam(value = "ok", required = false) String ok,
                                    Model model) {
        if (ok != null) {
            model.addAttribute("mensajeExito",
                    "¡Gracias! Recibimos tu mensaje y te contactaremos pronto.");
        }

        return "contacto";
    }

    @PostMapping("/contacto")
    public String procesarFormulario(@RequestParam String nombre,
                                     @RequestParam String email,
                                     @RequestParam(required = false) String telefono,
                                     @RequestParam String asunto,
                                     @RequestParam String mensaje,
                                     RedirectAttributes ra) {

        ra.addAttribute("ok", "1");
        return "redirect:/contacto";
    }
}
