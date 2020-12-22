package com.nk.customer.service;

import com.nk.customer.dto.VehicleDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VehicleService {

    public List<VehicleDTO> getListVehicleByCustomer(long customerId);

}
