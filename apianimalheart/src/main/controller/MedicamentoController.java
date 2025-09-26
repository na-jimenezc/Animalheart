package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.model.Medicamento;
import com.animalheart.animalheart.repository.MedicamentoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class MedicamentoController {

    @Autowired
    MedicamentoRepository medicamentoRepo;

    @GetMapping("/medicamentos")
    public String mostrarMedicamentos(Model model) {
        List<Medicamento> medicamentos = medicamentoRepo.findAll();
        model.addAttribute("medicamentos", medicamentos);
        return "ver-medicamentos";
    }
}
