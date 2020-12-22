package com.nk.customer.converter;

import com.nk.customer.dto.DistrictDTO;
import com.nk.customer.entity.District;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class DistrictConverter {

    public DistrictDTO convertToDTO(District district){
        ModelMapper modelMapper = new ModelMapper();
        DistrictDTO districtDTO = modelMapper.map(district, DistrictDTO.class);
        return districtDTO;
    }

    public District convertToEntity(DistrictDTO districtDTO) {
        ModelMapper modelMapper = new ModelMapper();
        District district = modelMapper.map(districtDTO, District.class);
        return district;
    }
}
