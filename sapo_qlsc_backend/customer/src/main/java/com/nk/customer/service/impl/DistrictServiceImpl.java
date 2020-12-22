package com.nk.customer.service.impl;

import com.nk.customer.converter.DistrictConverter;
import com.nk.customer.dto.DistrictDTO;
import com.nk.customer.entity.District;
import com.nk.customer.repository.DistrictRepository;
import com.nk.customer.service.DistrictService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DistrictServiceImpl implements DistrictService {

    private final DistrictRepository districtRepository;

    private final DistrictConverter districtConverter;

    public DistrictServiceImpl(DistrictRepository districtRepository, DistrictConverter districtConverter) {
        this.districtRepository = districtRepository;
        this.districtConverter = districtConverter;
    }

    @Override
    public List<DistrictDTO> getDistricts() {

        List<DistrictDTO> districtDTOS = new ArrayList<>();
        List<District> districts = districtRepository.getDistinct();

        for (District district : districts){
            districtDTOS.add(districtConverter.convertToDTO(district));
        }
        return districtDTOS;
    }
}
