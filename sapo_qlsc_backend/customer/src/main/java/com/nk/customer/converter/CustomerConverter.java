package com.nk.customer.converter;

import com.nk.customer.dto.CustomerDTO;
import com.nk.customer.entity.Customer;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class CustomerConverter {
//    private final MaintenanceCardConverter maintenanceCardConverter;
//    private final MaintenanceCardConvert maintenanceCardConvert;
//
//    private final WardConverter wardConverter;
//
//    public CustomerConverter(MaintenanceCardConverter maintenanceCardConverter, MaintenanceCardConvert maintenanceCardConvert, WardConverter wardConverter) {
//        this.maintenanceCardConverter = maintenanceCardConverter;
//        this.maintenanceCardConvert = maintenanceCardConvert;
//        this.wardConverter = wardConverter;
//    }
//    }

    @Autowired
    private WardConverter wardConverter;

    public CustomerDTO convertToDTO(Customer customer, String check){
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(customer.getId());
        customerDTO.setCode(customer.getCode());
        customerDTO.setCreatedDate(customer.getCreatedDate());
        customerDTO.setModifiedDate(customer.getModifiedDate());
        customerDTO.setPhoneNumber(customer.getPhoneNumber());
        customerDTO.setName(customer.getName());
        customerDTO.setEmail(customer.getEmail());
        customerDTO.setDescription(customer.getDescription());
        customerDTO.setAddress(customer.getAddress());
        customerDTO.setStatus(customer.getStatus());

        if(customer.getWard() != null){
            customerDTO.setWard(wardConverter.convertToDTO(customer.getWard()));
        }

        return customerDTO;
    }

    public Customer convertToEntity(CustomerDTO customerDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Customer customerEntity = modelMapper.map(customerDTO, Customer.class);
        return customerEntity;
    }

    public CustomerDTO convertCustomerDTO(Customer customer){
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setName(customer.getName());
        customerDTO.setAddress(customer.getAddress());
        customerDTO.setCode(customer.getCode());
        customerDTO.setDescription(customer.getDescription());
        customerDTO.setPhoneNumber(customer.getPhoneNumber());
        customerDTO.setId(customer.getId());
        customerDTO.setEmail(customer.getEmail());
        customerDTO.setStatus(customer.getStatus());
        customerDTO.setCreatedDate(customer.getCreatedDate());
        customerDTO.setModifiedDate(customer.getModifiedDate());
        return customerDTO;
    }

}
