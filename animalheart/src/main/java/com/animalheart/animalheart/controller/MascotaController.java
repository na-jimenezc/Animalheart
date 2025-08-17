package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.service.MascotaService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador MVC para gestionar las vistas de Mascotas.
 *
 * Responsabilidades:
 *   Listar todas las mascotas (GET /mascotas).
 *   Mostrar el detalle de una mascota por su id (GET /mascotas/{id}).
 *
 * Este controlador prepara los datos (atributos del {@link Model}) que
 * necesitan las plantillas Thymeleaf ver-mascotas.html y
 * detalle-mascota.html.
 *
 * La lógica de negocio y acceso a datos vive en {@link MascotaService}.
 */
@Controller
@RequestMapping("/mascotas") // Prefijo común para todas las rutas del controlador.
public class MascotaController {

    /** Servicio de dominio para operaciones relacionadas con Mascota. */
    private final MascotaService mascotaService;

    /**
     * Inyección por constructor recomendada para obtener el servicio.
     *
     * @param mascotaService servicio que provee operaciones de lectura/escritura de mascotas.
     */
    public MascotaController(MascotaService mascotaService) {
        this.mascotaService = mascotaService;
    }

    /**
     * GET /mascotas
     *
     * Obtiene la lista completa de mascotas desde el servicio y la expone
     * en el modelo bajo la clave "mascotas", para que sea
     * consumida por la plantilla ver-mascotas.html.
     *
     * @param model contenedor de atributos que verá la vista.
     * @return nombre lógico de la plantilla Thymeleaf: {@code "ver-mascotas"}.
     */
    @GetMapping
    public String listarMascotas(Model model) {
        // Añade al modelo la colección de mascotas para la vista de listado.
        model.addAttribute("mascotas", mascotaService.obtenerTodasMascotas());
        return "ver-mascotas";
    }

    /**
     * GET /mascotas/{id}
     *
     * Busca y muestra el detalle de una mascota específica por su identificador.
     * El resultado se expone en el modelo con la clave "mascota" y la
     * vista objetivo es detalle-mascota.html.
     *
     * @param id    identificador de la mascota (tomado de la ruta).
     * @param model modelo para exponer el objeto a la vista.
     * @return nombre lógico de la plantilla Thymeleaf: {@code "detalle-mascota"}.
     */
    @GetMapping("/{id}")
    public String verDetalleMascota(@PathVariable Integer id, Model model) {
        // Recupera la mascota por id y la deja disponible para la plantilla de detalle.
        model.addAttribute("mascota", mascotaService.obtenerMascotaPorId(id));
        return "detalle-mascota";
    }
}
