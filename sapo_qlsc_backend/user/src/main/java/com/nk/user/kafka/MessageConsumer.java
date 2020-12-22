package com.nk.user.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nk.user.entity.Message;
import com.nk.user.entity.User;
import com.nk.user.repository.MessageRepository;
import com.nk.user.repository.UserRepository;
import com.nk.user.socket.MessageModel2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
public class MessageConsumer {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private UserRepository userRepository;

    @KafkaListener(topics = {"qlsc_message"},groupId = "Group_id_1")
    @Transactional
    public void consume(@Payload String messageKafka, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws JsonProcessingException {
        System.out.println(messageKafka);
        MessageModel messageModel = new ObjectMapper().readValue(messageKafka, MessageModel.class);
        Date now = new Date();
        if(messageModel.getType() == 3){
            for(User user : userRepository.getAllManager()){
                MessageModel2 messageModel2 = new MessageModel2();
                messageModel2.setType(3);
                messageModel2.setMessage(key);
                messageModel2.setCode(messageModel.getMaintenanceCardCode());
                if(!user.getEmail().equals(messageModel.getAuthor())){
                    Message message = new Message();
                    message.setStatus((byte) 1);
                    message.setUrl("/admin/maintenanceCards/"+key);
                    message.setTitle("Phiếu sửa chữa " + messageModel.getMaintenanceCardCode().toUpperCase() +" đang chờ thanh toán");
                    message.setContent("Phiếu sửa chữa "+ messageModel.getMaintenanceCardCode().toUpperCase() +" đã hoàn thành sửa chữa và đang chờ thanh toán");
                    message.setUser(user);
                    message.setCreatedDate(now);
                    message.setModifiedDate(now);
                    messageRepository.save(message);
                    simpMessagingTemplate.convertAndSend("/topic/messages/" + user.getId(), messageModel2);
                }
            }
            if(StringUtils.isNotBlank(messageModel.getCoordinatorEmail()) && !messageModel.getCoordinatorEmail().equals(messageModel.getAuthor())) {
                User user = userRepository.checkExistEmail(messageModel.getCoordinatorEmail());
                if(user!=null) {
                    MessageModel2 messageModel2 = new MessageModel2();
                    messageModel2.setType(3);
                    messageModel2.setMessage(key);
                    messageModel2.setCode(messageModel.getMaintenanceCardCode());
                    if(!user.getEmail().equals(messageModel.getAuthor())){
                        Message message = new Message();
                        message.setStatus((byte) 1);
                        message.setUrl("/admin/maintenanceCards/"+key);
                        message.setTitle("Phiếu sửa chữa " + messageModel.getMaintenanceCardCode().toUpperCase() +" đang chờ thanh toán");
                        message.setContent("Phiếu sửa chữa "+ messageModel.getMaintenanceCardCode().toUpperCase() +" đã hoàn thành sửa chữa và đang chờ thanh toán");
                        message.setUser(user);
                        message.setCreatedDate(now);
                        message.setModifiedDate(now);
                        messageRepository.save(message);
                        simpMessagingTemplate.convertAndSend("/topic/messages/" + user.getId(), messageModel2);
                    }
                }
            }
        }
        else if(messageModel.getType() == 2){
            MessageModel2 messageModel2 = new MessageModel2();
            messageModel2.setType(2);
            messageModel2.setMessage(key);
            messageModel2.setCode(messageModel.getMaintenanceCardCode());
            if(StringUtils.isNotBlank(messageModel.getRepairmanEmail()) && !messageModel.getRepairmanEmail().equals(messageModel.getAuthor())) {
                User user = userRepository.checkExistEmail(messageModel.getRepairmanEmail());
                if(user!=null) {
                    simpMessagingTemplate.convertAndSend("/topic/messages/" + user.getId(), messageModel2);
                }
            }
            if(StringUtils.isNotBlank(messageModel.getCoordinatorEmail()) && !messageModel.getCoordinatorEmail().equals(messageModel.getAuthor())) {
                User user = userRepository.checkExistEmail(messageModel.getCoordinatorEmail());
                if(user!=null) {
                    simpMessagingTemplate.convertAndSend("/topic/messages/" + user.getId(), messageModel2);
                }
            }
            for(User user : userRepository.getAllManager()){
                simpMessagingTemplate.convertAndSend("/topic/messages/" + user.getId(), messageModel2);
            }
        }
        else if(messageModel.getType() == 1){
            MessageModel2 messageModel2 = new MessageModel2();
            messageModel2.setType(1);
            messageModel2.setMessage(key);
            messageModel2.setCode(messageModel.getMaintenanceCardCode());
            if(StringUtils.isNotBlank(messageModel.getRepairmanEmail()) && !messageModel.getRepairmanEmail().equals(messageModel.getAuthor())) {
                User user = userRepository.checkExistEmail(messageModel.getRepairmanEmail());
                if(user!=null) {
                    Message message = new Message();
                    message.setStatus((byte) 1);
                    message.setUrl("/admin/maintenanceCards/"+key);
                    message.setTitle("Phiếu sửa chữa " + messageModel.getMaintenanceCardCode().toUpperCase() +" đã được tạo mới");
                    message.setContent("Phiếu sửa chữa "+ messageModel.getMaintenanceCardCode().toUpperCase() +" đã được tạo mới. Hãy bắt đầu tiến hành sửa chữa");
                    message.setUser(user);
                    message.setCreatedDate(now);
                    message.setModifiedDate(now);
                    messageRepository.save(message);
                    simpMessagingTemplate.convertAndSend("/topic/messages/" + user.getId(), messageModel2);
                }
            }
        }

    }

}
