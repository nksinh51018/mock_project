package com.nk.customer.service.impl;

import com.nk.customer.converter.VehicleConverter;
import com.nk.customer.dto.VehicleDTO;
import com.nk.customer.entity.Vehicle;
import com.nk.customer.repository.VehicleRepository;
import com.nk.customer.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private VehicleConverter vehicleConverter;

    @Override
    public List<VehicleDTO> getListVehicleByCustomer(long customerId) {
        List<Vehicle> vehicles = vehicleRepository.getAllByCustomer(customerId);
        List<VehicleDTO> vehicleDTOS = new ArrayList<>();
        vehicles.forEach(vehicle -> vehicleDTOS.add(vehicleConverter.convertToDTO(vehicle)));
        return vehicleDTOS;
    }
}
