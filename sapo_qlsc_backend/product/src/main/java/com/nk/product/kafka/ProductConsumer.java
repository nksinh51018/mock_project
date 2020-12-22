package com.nk.product.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nk.product.entity.Product;
import com.nk.product.entity.ProductHistory;
import com.nk.product.repository.ProductHistoryRepository;
import com.nk.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ProductConsumer {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductHistoryRepository productHistoryRepository;

    @KafkaListener(topics = {"qlsc_product"},groupId = "Group_id_1")
    public void consume(@Payload String message, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws JsonProcessingException {
        System.out.println(message);
        ProductModel productModel = new ObjectMapper().readValue(message, ProductModel.class);
        try {
            Product product = productRepository.findById(Long.parseLong(key)).orElse(null);
            if(product != null){
                product.setQuantity(product.getQuantity() - productModel.getAmountChargeInUnit());
                productRepository.save(product);
                Date now = new Date();
                ProductHistory productHistory = new ProductHistory();
                productHistory.setAmountChargeInUnit(productModel.getAmountChargeInUnit());
                productHistory.setName(product.getName());
                productHistory.setNote("Hoàn thành đơn "+ productModel.getCode().toUpperCase());
                productHistory.setProductId(product.getId());
                productHistory.setStockRemain(product.getQuantity());
                productHistory.setCreatedDate(now);
                productHistory.setModifiedDate(now);
                productHistoryRepository.save(productHistory);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
//    @KafkaListener(topics = {"Kafka_json5"},groupId = "Group_json",containerFactory = "productDTOKafkaListenerContainerFactory")
//    public void consumeJson(ProductDTO productDTO){
//        System.out.println(productDTO);
////        productService.insertProduct(productDTO);
//    }

}