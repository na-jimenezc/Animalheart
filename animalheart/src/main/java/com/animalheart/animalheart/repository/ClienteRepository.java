package com.animalheart.animalheart.repository;

import com.animalheart.animalheart.entities.Cliente;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ClienteRepository {

    private static final List<Cliente> CLIENTES = new ArrayList<>();

    static {
        CLIENTES.add(new Cliente("123", "Carlos Ruiz", "carlos@gmail.com", "3214567890"));
        CLIENTES.add(new Cliente("456", "Lucía Gómez", "lucia@gmail.com", "3101234567"));
        CLIENTES.add(new Cliente("789", "Mateo Torres", "mateo@gmail.com", "3149876543"));
        CLIENTES.add(new Cliente("101", "Ana López", "ana@gmail.com", "3151122334"));
        CLIENTES.add(new Cliente("202", "Diego Pérez", "diego@gmail.com", "3002233445"));
    }

    public List<Cliente> findAll() {
        return CLIENTES;
    }

    public Cliente findByCedula(String cedula) {
        for (Cliente c : CLIENTES) {
            if (c.getCedula().equalsIgnoreCase(cedula)) {
                return c;
            }
        }
        return null;
    }

    public void save(Cliente cliente) {
        CLIENTES.add(cliente);
    }

    public void deleteByCedula(String cedula) {
        CLIENTES.removeIf(c -> c.getCedula().equalsIgnoreCase(cedula));
    }
}
