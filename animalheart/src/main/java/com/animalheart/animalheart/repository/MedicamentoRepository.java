package com.animalheart.animalheart.repository;

import com.animalheart.animalheart.entities.Medicamento;

import java.util.ArrayList;
import java.util.List;

public class MedicamentoRepository {

    private static final List<Medicamento> MEDICAMENTOS = new ArrayList<>();

    static {
        MEDICAMENTOS.add(new Medicamento("Amoxicilina", 2.0f, 4.5f, 100, 10));
        MEDICAMENTOS.add(new Medicamento("Ivermectina", 1.5f, 3.0f, 80, 5));
        MEDICAMENTOS.add(new Medicamento("Ketoprofeno", 2.5f, 5.0f, 60, 12));
        MEDICAMENTOS.add(new Medicamento("Metronidazol", 1.8f, 3.5f, 90, 8));
        MEDICAMENTOS.add(new Medicamento("Carprofeno", 2.2f, 4.0f, 75, 6));
    }

    public List<Medicamento> findAll() {
        return MEDICAMENTOS;
    }

    public Medicamento findByNombre(String nombre) {
        for (Medicamento m : MEDICAMENTOS) {
            if (m.getNombre().equalsIgnoreCase(nombre)) {
                return m;
            }
        }
        return null;
    }

    public void save(Medicamento medicamento) {
        MEDICAMENTOS.add(medicamento);
    }

    public void deleteByNombre(String nombre) {
        MEDICAMENTOS.removeIf(m -> m.getNombre().equalsIgnoreCase(nombre));
    }
    
}