package com.nk.customer.converter;

import com.nk.customer.dto.WardDTO;
import com.nk.customer.entity.Ward;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class WardConverter {

    private final DistrictConverter districtConverter;

    public WardConverter(DistrictConverter districtConverter) {
        this.districtConverter = districtConverter;
    }

    public WardDTO convertToDTO(Ward ward){
        ModelMapper modelMapper = new ModelMapper();
        WardDTO wardDTO = modelMapper.map(ward, WardDTO.class);
        return wardDTO;
    }

    public Ward convertToEntity(WardDTO wardDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Ward ward = modelMapper.map(wardDTO, Ward.class);
        return ward;
    }

}
