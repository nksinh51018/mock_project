package com.nk.customer.controller;

import com.nk.customer.dto.CustomerDTO;
import com.nk.customer.dto.VehicleDTO;
import com.nk.customer.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/vehicle/customer/{customerId}")
    public ResponseEntity<Object> getAllByCustomer(@PathVariable("customerId") Long customerId){
        List<VehicleDTO> vehicleDTOS = vehicleService.getListVehicleByCustomer(customerId);
        return new ResponseEntity<>(vehicleDTOS, HttpStatus.OK);
    }

}
