package com.animalheart.animalheart.service;

import com.animalheart.animalheart.entities.Veterinario;
import com.animalheart.animalheart.repository.VeterinarioRepository;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Implementación de {@link VeterinarioService}.
 *
 * Responsabilidades:
 *   Delegar en el {@link VeterinarioRepository} las operaciones de lectura/validación.
 *   Exponer métodos de dominio usados por controladores (login y vistas de admin).
 */
@Service // Permite que Spring registre esta clase como bean de servicio.
public class VeterinarioServiceImpl implements VeterinarioService {

    /** Dependencia al repositorio (fuente de datos en memoria). */
    private final VeterinarioRepository veterinarioRepository;

    /**
     * Inyección por constructor recomendada.
     * @param veterinarioRepository repositorio de veterinarios.
     */
    public VeterinarioServiceImpl(VeterinarioRepository veterinarioRepository) {
        this.veterinarioRepository = veterinarioRepository;
    }

    /**
     * Devuelve todos los veterinarios disponibles (sin filtrar por estado).
     * Simple delegación a {@code veterinarioRepository.findAll()}.
     *
     * @return lista completa de {@link Veterinario}.
     */
    @Override
    public List<Veterinario> obtenerTodos() {
        return veterinarioRepository.findAll();
    }

    /**
     * Valida las credenciales de acceso del veterinario.
     * Delegado a {@code veterinarioRepository.buscarPorCredenciales(usuario, clave)}.
     *
     * @param nombreUsuario usuario ingresado en el formulario.
     * @param contrasenia   contraseña ingresada en el formulario.
     * @return el {@link Veterinario} autenticado o {@code null} si no coincide.
     */
    @Override
    public Veterinario validarVeterinario(String nombreUsuario, String contrasenia) {
        return veterinarioRepository.buscarPorCredenciales(nombreUsuario, contrasenia);
    }

    /**
     * Obtiene únicamente los veterinarios activos (disponibles).
     * Se apoya en el método específico del repositorio {@code findAllActivos()}.
     *
     * @return lista de veterinarios con estado activo.
     */
    @Override
    public List<Veterinario> obtenerVeterinariosActivos() {
        return veterinarioRepository.findAllActivos();
    }

    /**
     * Busca un veterinario por su identificador.
     * Devuelve {@code null} si no existe, para que el controlador
     * pueda redirigir o mostrar un mensaje adecuado.
     *
     * @param id identificador del veterinario.
     * @return el {@link Veterinario} encontrado o {@code null}.
     */
    @Override
    public Veterinario obtenerVeterinarioPorId(Integer id) {
        return veterinarioRepository.findById(id).orElse(null);
    }
}
