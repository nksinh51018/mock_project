package com.nk.customer.service.impl;
import com.nk.customer.converter.WardConverter;
import com.nk.customer.dto.WardDTO;
import com.nk.customer.entity.Ward;
import com.nk.customer.repository.WardRepository;
import com.nk.customer.service.WardService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WardServiceImpl implements WardService {

    private final WardRepository wardRepository;

    private final WardConverter wardConverter;

    public WardServiceImpl(WardRepository wardRepository, WardConverter wardConverter) {
        this.wardRepository = wardRepository;
        this.wardConverter = wardConverter;
    }

    @Override
    public List<WardDTO> getWardOfDistrict(String district) {

        List<WardDTO> wardDTOS = new ArrayList<>();
        List<Ward> wards = wardRepository.getWardByDistrict(district);

        for (Ward ward : wards){
            wardDTOS.add(wardConverter.convertToDTO(ward));
        }
        return wardDTOS;
    }
}
