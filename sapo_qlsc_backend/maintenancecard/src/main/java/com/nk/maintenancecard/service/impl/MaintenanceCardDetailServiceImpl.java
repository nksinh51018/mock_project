package com.nk.maintenancecard.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nk.maintenancecard.converter.MaintenanceCardConverter;
import com.nk.maintenancecard.converter.MaintenanceCardDetailConverter;
import com.nk.maintenancecard.dto.MaintenanceCardDTO;
import com.nk.maintenancecard.entity.MaintenanceCard;
import com.nk.maintenancecard.entity.MaintenanceCardDetail;
import com.nk.maintenancecard.entity.MaintenanceCardDetailStatusHistory;
import com.nk.maintenancecard.exception.commonException.NotFoundException;
import com.nk.maintenancecard.exception.maintenanceCardException.NotFoundRepairmanException;
import com.nk.maintenancecard.model.MessageModel;
import com.nk.maintenancecard.repository.MaintenanceCardDetailRepository;
import com.nk.maintenancecard.service.MaintenanceCardDetailService;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class MaintenanceCardDetailServiceImpl implements MaintenanceCardDetailService {

    @Autowired
    private MaintenanceCardDetailRepository maintenanceCardDetailRepository;

    @Autowired
    private MaintenanceCardDetailConverter maintenanceCardDetailConverter;

    @Autowired
    private MaintenanceCardConverter maintenanceCardConverter;

    @Autowired
    private KafkaTemplate<String,String> kafkaTemplate;


    @Override
    public MaintenanceCardDTO updateStatusMaintenanceCardDetail(Long id, String email) throws NotFoundException, NotFoundRepairmanException, JsonProcessingException {
        Date now = new Date();
        MaintenanceCardDetail maintenanceCardDetail = maintenanceCardDetailRepository.findById(id).orElse(null);
        MaintenanceCard maintenanceCard = maintenanceCardDetail.getMaintenanceCard();
        if(maintenanceCard.getRepairmanEmail() == null || maintenanceCard.getRepairmanEmail() == email){
            throw new NotFoundException("Not found maintenance card detail");
        }
        byte status = 1;
        boolean check = true;
        if(maintenanceCardDetail != null && maintenanceCard.getRepairmanEmail() != null){
            if(maintenanceCardDetail.getStatus() <2 && maintenanceCardDetail.getProductType() == 2){
                maintenanceCardDetail.setStatus((byte) (maintenanceCardDetail.getStatus()+1));
                MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                maintenanceCardDetailStatusHistory.setCreatedDate(now);
                maintenanceCardDetailStatusHistory.setModifiedDate(now);
                maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                maintenanceCardDetailStatusHistory.setStatus((byte) (maintenanceCardDetail.getStatus()));
                maintenanceCardDetail.getMaintenanceCardDetailStatusHistories().add(maintenanceCardDetailStatusHistory);
                if(maintenanceCardDetail.getProductType() == 2) {
                    if (maintenanceCardDetail.getStatus() == 1 || maintenanceCardDetail.getStatus() == 2) {
                        status = 1;
                    }
                    if (maintenanceCardDetail.getStatus() != 2) {
                        check = false;
                    }
                }
            }
            for(MaintenanceCardDetail maintenanceCardDetail1 : maintenanceCard.getMaintenanceCardDetails()){
                if(maintenanceCardDetail1.getId() != maintenanceCardDetail.getId()){
                    if(maintenanceCardDetail1.getProductType() == 2) {
                        if (maintenanceCardDetail1.getStatus() == 1 || maintenanceCardDetail1.getStatus() == 2) {
                            status = 1;
                        }
                        if (maintenanceCardDetail1.getStatus() != 2) {
                            check = false;
                        }
                    }
                }
            }
            if(check){
                maintenanceCard.setWorkStatus((byte) 2);
                ProducerRecord<String, String> record2 = new ProducerRecord<String, String>("qlsc_user", maintenanceCard.getRepairmanId()+"","-1" );
                kafkaTemplate.send(record2);
            }
            else{
                maintenanceCard.setWorkStatus(status);
            }
            MaintenanceCardDetail maintenanceCardDetail1 = maintenanceCardDetailRepository.save(maintenanceCardDetail);
            MaintenanceCard maintenanceCard1 =  maintenanceCardDetail1.getMaintenanceCard();
            MessageModel messageModel = new MessageModel();
            messageModel.setMaintenanceCardCode(maintenanceCard1.getCode());
            messageModel.setAuthor(email);
            messageModel.setCoordinatorEmail(maintenanceCard1.getCoordinatorEmail());
            messageModel.setRepairmanEmail(maintenanceCard1.getRepairmanEmail());
            if(maintenanceCard1.getWorkStatus() ==2 && maintenanceCard1.getPayStatus() == 0 ){
                messageModel.setType(2);
            }
            else{
                messageModel.setType(3);
            }
            ObjectMapper mapper = new ObjectMapper();
            String jsonString = mapper.writeValueAsString(messageModel);
            ProducerRecord<String, String> record = new ProducerRecord<String, String>("qlsc_message", maintenanceCard1.getId()+"", jsonString);
            kafkaTemplate.send(record);
            return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);
        }
        else if(maintenanceCard.getRepairmanId() != 0) {
            throw new NotFoundException("Not found maintenance card detail");
        }
        else{
            throw new NotFoundRepairmanException("");
        }
    }
}
