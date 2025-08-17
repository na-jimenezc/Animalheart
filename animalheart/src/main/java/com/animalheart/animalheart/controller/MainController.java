package com.animalheart.animalheart.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controlador principal.
 *
 * Responsabilidad:
 * Exponer la página de inicio cuando el usuario visita la raíz del sitio
 * (GET "/"). Retorna el nombre lógico de la vista "index", es decir,
 * Thymeleaf buscará el archivo src/main/resources/templates/index.html.
 *
 * Notas:
 *   Esta clase está dentro del paquete base com.animalheart.animalheart,
 *       por lo que Spring la detecta con el component scan automático
 *       gracias a @SpringBootApplication en la clase principal.
 */
@Controller
public class MainController {

    /**
     * Maneja GET "/" (raíz del sitio).
     *
     * @return nombre lógico de la vista "index" para que Thymeleaf
     *         renderice templates/index.html.
     */
    @GetMapping("/")
    public String index() {
        // Simplemente delega en la plantilla "index".
        return "index";
    }
}
