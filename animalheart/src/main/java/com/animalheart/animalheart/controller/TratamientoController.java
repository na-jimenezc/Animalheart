package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.entities.Tratamiento;
import com.animalheart.animalheart.repository.TratamientoRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * Controlador encargado de mostrar los tratamientos realizados a las mascotas.
 *
 * Extrae la lista desde un repositorio en memoria.
 */
@Controller
public class TratamientoController {

    /** Repositorio en memoria con tratamientos registrados. */
    private final TratamientoRepository tratamientoRepo = new TratamientoRepository();

    /**
     * Muestra todos los tratamientos aplicados en la vista "ver-tratamientos".
     *
     * @param model modelo que carga la lista de tratamientos
     * @return nombre de la vista HTML donde se presentan los tratamientos
     */
    @GetMapping("/tratamientos")
    public String mostrarTratamientos(Model model) {
        List<Tratamiento> tratamientos = tratamientoRepo.findAll();
        model.addAttribute("tratamientos", tratamientos);
        return "ver-tratamientos";
    }
}
