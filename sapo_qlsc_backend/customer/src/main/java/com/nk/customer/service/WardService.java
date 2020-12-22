package com.nk.customer.service;


import com.nk.customer.dto.WardDTO;

import java.util.List;

public interface WardService {

    List<WardDTO> getWardOfDistrict(String district);
}
