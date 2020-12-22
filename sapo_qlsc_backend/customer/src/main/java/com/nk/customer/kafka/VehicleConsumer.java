package com.nk.customer.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nk.customer.entity.Customer;
import com.nk.customer.entity.Vehicle;
import com.nk.customer.repository.CustomerRepository;
import com.nk.customer.repository.VehicleRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class VehicleConsumer {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private CustomerRepository customerRepository;

//    @Autowired
//    private V

    @KafkaListener(topics = {"qlsc_vehicle"},groupId = "customer")
    @Transactional
    public void consume(@Payload String message, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws JsonProcessingException {
        System.out.println(message);
        Customer customer = customerRepository.findById(Long.parseLong(key)).orElse(null);
        if(customer!=null){
            VehicleModel vehicleModel = new ObjectMapper().readValue(message, VehicleModel.class);
            Vehicle vehicle = vehicleRepository.getVehicleByPlateNumber(vehicleModel.getPlateNumber());
            Date now = new Date();
            if(vehicle == null){
                Vehicle newVehicle = new Vehicle();
                newVehicle.setModifiedDate(now);
                newVehicle.setCreatedDate(now);
                newVehicle.setCustomer(customer);
                newVehicle.setColor(vehicleModel.getColor());
                newVehicle.setModel(vehicleModel.getModel());
                newVehicle.setPlateNumber(vehicleModel.getPlateNumber());
                vehicleRepository.save(newVehicle);
            }
            else{
                if(StringUtils.isNotBlank(vehicleModel.getModel()) && !StringUtils.equals(vehicleModel.getModel(),vehicle.getModel())){
                    vehicle.setModel(vehicleModel.getModel());
                }
                if(StringUtils.isNotBlank(vehicleModel.getPlateNumber()) && !StringUtils.equals(vehicleModel.getPlateNumber(),vehicle.getPlateNumber())){
                    vehicle.setPlateNumber(vehicleModel.getPlateNumber());
                }
                if(StringUtils.isNotBlank(vehicleModel.getColor()) && !StringUtils.equals(vehicleModel.getColor(),vehicle.getColor())){
                    vehicle.setColor(vehicleModel.getColor());
                }
                vehicleRepository.save(vehicle);
            }
        }
    }
//    @KafkaListener(topics = {"Kafka_json5"},groupId = "Group_json",containerFactory = "productDTOKafkaListenerContainerFactory")
//    public void consumeJson(ProductDTO productDTO){
//        System.out.println(productDTO);
////        productService.insertProduct(productDTO);
//    }

}
