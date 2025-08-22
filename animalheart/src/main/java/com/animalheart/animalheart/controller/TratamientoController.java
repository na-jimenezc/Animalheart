package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.entities.Tratamiento;
import com.animalheart.animalheart.repository.TratamientoRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class TratamientoController {

    private final TratamientoRepository tratamientoRepo = new TratamientoRepository();

    @GetMapping("/tratamientos")
    public String mostrarTratamientos(Model model) {
        List<Tratamiento> tratamientos = tratamientoRepo.findAll();
        model.addAttribute("tratamientos", tratamientos);
        return "ver-tratamientos";
    }
    
}
