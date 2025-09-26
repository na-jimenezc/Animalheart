package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.model.Tratamiento;
import com.animalheart.animalheart.repository.TratamientoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class TratamientoController {

    @Autowired
    TratamientoRepository tratamientoRepo;

    @GetMapping("/tratamientos")
    public String mostrarTratamientos(Model model) {
        List<Tratamiento> tratamientos = tratamientoRepo.findAll();
        model.addAttribute("tratamientos", tratamientos);
        return "ver-tratamientos";
    }
    
}
