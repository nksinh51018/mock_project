package com.nk.customer.service;

import com.nk.customer.dto.CustomerDTO;
import com.nk.customer.exception.customerException.DataTooLongException;
import com.nk.customer.model.CustomerFilter;
import com.nk.customer.model.SearchCustomer;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface CustomerService {

    CustomerDTO addCustomer(CustomerDTO customerDTO) throws ParseException, DataTooLongException;
    Map<String, Object> searchCustomer(SearchCustomer searchCustomer);
    CustomerDTO updateCustomer(CustomerDTO customerDTO, Long idCustomer);
    void deleteCustomer(Long idCustomer);
    void updateMultipleStatusCustomer(List<Long> ids);
    CustomerDTO getById(Long idCustomer);
//    Map<String, Object> filterPayStatusOfCustomer(CustomerFilter customerFilter);
    boolean checkPhoneNumber(String phoneNumber);
}
