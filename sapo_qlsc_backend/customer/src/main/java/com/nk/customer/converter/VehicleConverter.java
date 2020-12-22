package com.nk.customer.converter;

import com.nk.customer.dto.VehicleDTO;
import com.nk.customer.entity.Vehicle;
import org.springframework.stereotype.Component;

@Component
public class VehicleConverter {

    public VehicleDTO convertToDTO(Vehicle entity){
        VehicleDTO vehicleDTO = new VehicleDTO();
        vehicleDTO.setColor(entity.getColor());
        vehicleDTO.setModel(entity.getModel());
        vehicleDTO.setPlateNumber(entity.getPlateNumber());
        vehicleDTO.setId(entity.getId());
        return vehicleDTO;
    }

}
