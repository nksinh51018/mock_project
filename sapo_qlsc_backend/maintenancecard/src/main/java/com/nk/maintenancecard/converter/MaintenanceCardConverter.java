package com.nk.maintenancecard.converter;

import com.nk.maintenancecard.dto.*;
import com.nk.maintenancecard.entity.*;
import com.nk.maintenancecard.repository.MaintenanceCardDetailRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MaintenanceCardConverter {

    @Autowired
    MaintenanceCardDetailRepository maintenanceCardDetailRepository;

    public MaintenanceCardDTO convertToDTO(MaintenanceCard maintenanceCard) {
        MaintenanceCardDTO maintenanceCardDTO = new MaintenanceCardDTO();
        maintenanceCardDTO.setCode(maintenanceCard.getCode());
        maintenanceCardDTO.setPlatesNumber(maintenanceCard.getPlatesNumber());
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(maintenanceCard.getCustomerId());
        customerDTO.setName(maintenanceCard.getCustomerName());
        customerDTO.setPhoneNumber(maintenanceCard.getCustomerPhone());
        maintenanceCardDTO.setCustomer(customerDTO);
        UserDTO repairman = new UserDTO();
        if(maintenanceCard.getRepairmanId()!=0){
            repairman.setId(maintenanceCard.getRepairmanId());
            repairman.setFullName(maintenanceCard.getRepairmanName());
            repairman.setEmail(maintenanceCard.getRepairmanEmail());
            maintenanceCardDTO.setRepairman(repairman);
        }
        maintenanceCardDTO.setDescription(maintenanceCard.getDescription());
        maintenanceCardDTO.setReturnDate(maintenanceCard.getReturnDate());//
        maintenanceCardDTO.setPrice(maintenanceCard.getPrice());
        maintenanceCardDTO.setReturnDate(maintenanceCard.getReturnDate());
        maintenanceCardDTO.setWorkStatus(maintenanceCard.getWorkStatus());
        maintenanceCardDTO.setPayStatus(maintenanceCard.getPayStatus());
        maintenanceCardDTO.setModel(maintenanceCard.getModel());
        maintenanceCardDTO.setColor(maintenanceCard.getColor());
        UserDTO coordinator = new UserDTO();
        coordinator.setId(maintenanceCard.getCoordinatorId());
        coordinator.setFullName(maintenanceCard.getCoordinatorName());
        coordinator.setEmail(maintenanceCard.getCoordinatorEmail());
        maintenanceCardDTO.setCoordinator(coordinator);
        maintenanceCardDTO.setId(maintenanceCard.getId());
        maintenanceCardDTO.setCreatedDate(maintenanceCard.getCreatedDate());
        maintenanceCardDTO.setExpectedReturnDate(maintenanceCard.getExpectedReturnDate());
        return maintenanceCardDTO;
    }
    public MaintenanceCard convertToEntity(MaintenanceCardDTO maintenanceCardDTO) {
        MaintenanceCard maintenanceCard = new MaintenanceCard();
        UserDTO repairman = maintenanceCardDTO.getRepairman();
        if(repairman!= null && repairman.getId() != null){
            maintenanceCard.setRepairmanName(repairman.getFullName());
            maintenanceCard.setRepairmanId(repairman.getId());
            maintenanceCard.setRepairmanEmail(repairman.getEmail());
        }
        CustomerDTO customerDTO = maintenanceCardDTO.getCustomer();
        maintenanceCard.setCustomerPhone(customerDTO.getPhoneNumber());
        maintenanceCard.setCustomerName(customerDTO.getName());
        maintenanceCard.setCustomerId(customerDTO.getId());
        UserDTO coordinator = maintenanceCardDTO.getCoordinator();
        maintenanceCard.setCoordinatorName(coordinator.getFullName());
        maintenanceCard.setCoordinatorId(coordinator.getId());
        maintenanceCard.setCoordinatorEmail(coordinator.getEmail());
        maintenanceCard.setWorkStatus(maintenanceCardDTO.getWorkStatus());
        maintenanceCard.setCode(maintenanceCardDTO.getCode());
        maintenanceCard.setPayStatus(maintenanceCardDTO.getPayStatus());
        maintenanceCard.setPlatesNumber(maintenanceCardDTO.getPlatesNumber());
        maintenanceCard.setPrice(maintenanceCardDTO.getPrice());
        maintenanceCard.setReturnDate(maintenanceCardDTO.getReturnDate());
        maintenanceCard.setColor(maintenanceCardDTO.getColor());
        maintenanceCard.setDescription(maintenanceCardDTO.getDescription());
        maintenanceCard.setExpectedReturnDate(maintenanceCardDTO.getExpectedReturnDate());
        List<MaintenanceCardDetail> maintenanceCardDetails = new ArrayList<>();
        System.out.println( maintenanceCardDTO.getMaintenanceCardDetails().size());
        for(MaintenanceCardDetailDTO maintenanceCardDetailDTO : maintenanceCardDTO.getMaintenanceCardDetails()){
            MaintenanceCardDetail maintenanceCardDetail = new MaintenanceCardDetail();
            ProductDTO productDTO = maintenanceCardDetailDTO.getProduct();
            maintenanceCardDetail.setProductCode(productDTO.getCode());
            maintenanceCardDetail.setMaintenanceCard(maintenanceCard);
            maintenanceCardDetail.setStatus(maintenanceCardDetailDTO.getStatus());
            maintenanceCardDetail.setPrice(maintenanceCardDetailDTO.getPrice());
            maintenanceCardDetail.setProductId(productDTO.getId());
            maintenanceCardDetail.setProductImage(productDTO.getImage());
            maintenanceCardDetail.setProductName(productDTO.getName());
            maintenanceCardDetail.setProductType(productDTO.getType());
            maintenanceCardDetail.setProductUnit(productDTO.getUnit());
            maintenanceCardDetail.setQuantity(maintenanceCardDetailDTO.getQuantity());
            maintenanceCardDetail.setId(maintenanceCardDetailDTO.getId());
            maintenanceCardDetail.setProductPricePerUnit(productDTO.getPricePerUnit());
            maintenanceCardDetails.add(maintenanceCardDetail);
        }
        maintenanceCard.setMaintenanceCardDetails(maintenanceCardDetails);
        maintenanceCard.setModel(maintenanceCardDTO.getModel());
        maintenanceCard.setId(maintenanceCardDTO.getId());
        return maintenanceCard;
    }
    public List<MaintenanceCardDTO> convertToMaintenanceCardDTOList(List<MaintenanceCard> maintenanceCardList){
        List<MaintenanceCardDTO> list = new ArrayList<>();
        for (MaintenanceCard maintenanceCard: maintenanceCardList
        ) {
            list.add(convertToDTO(maintenanceCard));
        }

        return list;
    }
    public List<MaintenanceCardDTO> convertToCoordinatorWarrantyCardsDTO(List<MaintenanceCard> coordinatorWarrantyCardsList){
        List<MaintenanceCardDTO> list = new ArrayList<>();
        coordinatorWarrantyCardsList.forEach(maintenanceCard -> {
            System.out.println(maintenanceCard);
            list.add(convertToDTO(maintenanceCard));

        });
        return list;
    }

    public List<MaintenanceCard> convertToMaintenanceCardDTOListEntity(List<MaintenanceCardDTO> maintenanceCardList){
        List<MaintenanceCard> list = new ArrayList<>();
        maintenanceCardList.forEach(maintenanceCard ->{
            System.out.println(maintenanceCard);
            list.add(convertToEntity(maintenanceCard));
        });
        System.out.println("convertToMaintenanceCardDTOListEntity Size: "+list.size());
        return list;
    }
    public List<MaintenanceCard> convertToCoordinatorWarrantyCardsDTOEntity(List<MaintenanceCardDTO> coordinatorWarrantyCardsList){
        List<MaintenanceCard> list = new ArrayList<>();
        coordinatorWarrantyCardsList.forEach(maintenanceCard -> list.add(convertToEntity(maintenanceCard)));
        return list;
    }
    public MaintenanceCardDTO convertAllToDTO(MaintenanceCard maintenanceCard) {
        MaintenanceCardDTO maintenanceCardDTO = convertToDTO(maintenanceCard);
        List<MaintenanceCardDetailDTO> maintenanceCardDetailDTOS = new ArrayList<>();
        List<MaintenanceCardDetailStatusHistoryDTO> maintenanceCardDetailStatusHistoryDTOS = new ArrayList<>();
        System.out.println(maintenanceCard.getMaintenanceCardDetails().size());
        for (MaintenanceCardDetail maintenanceCardDetail: maintenanceCard.getMaintenanceCardDetails()) {
            if(maintenanceCardDetail.getIsDelete() == 0) {
                MaintenanceCardDetailDTO maintenanceCardDetailDTO = new MaintenanceCardDetailDTO();
                maintenanceCardDetailDTO.setPrice(maintenanceCardDetail.getPrice());
                ProductDTO productDTO = new ProductDTO();
                productDTO.setType(maintenanceCardDetail.getProductType());
                productDTO.setCode(maintenanceCardDetail.getProductCode());
                productDTO.setId(maintenanceCardDetail.getProductId());
                productDTO.setImage(maintenanceCardDetail.getProductImage());
                productDTO.setName(maintenanceCardDetail.getProductName());
                productDTO.setUnit(maintenanceCardDetail.getProductUnit());
                productDTO.setPricePerUnit(maintenanceCardDetail.getProductPricePerUnit());
                maintenanceCardDetailDTO.setProduct(productDTO);
                maintenanceCardDetailDTO.setQuantity(maintenanceCardDetail.getQuantity());
                maintenanceCardDetailDTO.setStatus(maintenanceCardDetail.getStatus());
                maintenanceCardDetailDTO.setCreatedDate(maintenanceCardDetail.getCreatedDate());
                maintenanceCardDetailDTO.setId(maintenanceCardDetail.getId());
                maintenanceCardDetailDTO.setModifiedDate(maintenanceCardDetail.getModifiedDate());
                maintenanceCardDetailDTOS.add(maintenanceCardDetailDTO);
            }
            List<MaintenanceCardDetailStatusHistory> maintenanceCardDetailStatusHistories = maintenanceCardDetail.getMaintenanceCardDetailStatusHistories();
            if(maintenanceCardDetailStatusHistories != null){
                for(MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory: maintenanceCardDetailStatusHistories){
                    MaintenanceCardDetailStatusHistoryDTO maintenanceCardDetailStatusHistoryDTO = new MaintenanceCardDetailStatusHistoryDTO();
                    maintenanceCardDetailStatusHistoryDTO.setName(maintenanceCardDetailStatusHistory.getMaintenanceCardDetail().getProductName());
                    maintenanceCardDetailStatusHistoryDTO.setStatus(maintenanceCardDetailStatusHistory.getStatus());
                    maintenanceCardDetailStatusHistoryDTO.setCreatedDate(maintenanceCardDetailStatusHistory.getCreatedDate());
                    maintenanceCardDetailStatusHistoryDTO.setId(maintenanceCardDetailStatusHistory.getId());
                    maintenanceCardDetailStatusHistoryDTO.setModifiedDate(maintenanceCardDetailStatusHistory.getModifiedDate());
                    maintenanceCardDetailStatusHistoryDTOS.add(maintenanceCardDetailStatusHistoryDTO);
                }
            }
        }
        maintenanceCardDTO.setMaintenanceCardDetailStatusHistories(maintenanceCardDetailStatusHistoryDTOS);
        List<PaymentHistoryDTO> paymentHistoryDTOS = new ArrayList<>();
        if(maintenanceCard.getPaymentHistories() != null){
            for(PaymentHistory paymentHistory : maintenanceCard.getPaymentHistories()){
                PaymentHistoryDTO paymentHistoryDTO = new PaymentHistoryDTO();
                paymentHistoryDTO.setMoney(paymentHistory.getMoney());
                PaymentMethodDTO paymentMethodDTO = new PaymentMethodDTO();
                PaymentMethod paymentMethod = paymentHistory.getPaymentMethod();
                paymentMethodDTO.setName(paymentMethod.getName());
                paymentHistoryDTO.setPaymentMethod(paymentMethodDTO);
                paymentHistoryDTO.setCreatedDate(paymentHistory.getCreatedDate());
                paymentHistoryDTO.setModifiedDate(paymentHistory.getModifiedDate());
                paymentHistoryDTO.setId(paymentHistory.getId());
                paymentHistoryDTOS.add(paymentHistoryDTO);
            }
            maintenanceCardDTO.setPaymentHistories(paymentHistoryDTOS);
        }
        maintenanceCardDTO.setMaintenanceCardDetails(maintenanceCardDetailDTOS);
        return maintenanceCardDTO;
    }

}
