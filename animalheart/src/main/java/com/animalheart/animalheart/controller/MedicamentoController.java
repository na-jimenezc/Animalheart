package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.entities.Medicamento;
import com.animalheart.animalheart.repository.MedicamentoRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * Controlador que maneja las peticiones relacionadas con los Medicamentos.
 *
 * Muestra los medicamentos disponibles para tratamientos.
 */
@Controller
public class MedicamentoController {

    /** Repositorio en memoria con medicamentos predefinidos. */
    private final MedicamentoRepository medicamentoRepo = new MedicamentoRepository();

    /**
     * Muestra todos los medicamentos disponibles en la vista "ver-medicamentos".
     *
     * @param model modelo de Spring MVC que lleva datos a la vista
     * @return nombre de la vista que presenta la lista de medicamentos
     */
    @GetMapping("/medicamentos")
    public String mostrarMedicamentos(Model model) {
        List<Medicamento> medicamentos = medicamentoRepo.findAll();
        model.addAttribute("medicamentos", medicamentos);
        return "ver-medicamentos";
    }
}
