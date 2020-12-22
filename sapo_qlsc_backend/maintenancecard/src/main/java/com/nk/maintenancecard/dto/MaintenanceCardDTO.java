package com.nk.maintenancecard.dto;

import com.nk.maintenancecard.entity.MaintenanceCardDetail;
import com.nk.maintenancecard.entity.PaymentHistory;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class MaintenanceCardDTO extends BaseDTO {

    private String code;

    private String platesNumber;

    private long customerId;

    private String customerName;

    private String customerPhone;

    private long repairmanId;

    private String repairmanName;

    private String repairmanEmail;

    private long coordinatorId;

    private String coordinatorName;

    private String coordinatorEmail;

    private String description;

    private Date returnDate;

    private BigDecimal price;

    private byte workStatus;

    private byte payStatus;

    private String model;

    private String color;

    private List<MaintenanceCardDetailDTO> maintenanceCardDetails;

    private List<PaymentHistoryDTO> paymentHistories;

    private List<MaintenanceCardDetailStatusHistoryDTO> maintenanceCardDetailStatusHistories;

    public String getRepairmanEmail() {
        return repairmanEmail;
    }

    public void setRepairmanEmail(String repairmanEmail) {
        this.repairmanEmail = repairmanEmail;
    }

    public String getCoordinatorEmail() {
        return coordinatorEmail;
    }

    public void setCoordinatorEmail(String coordinatorEmail) {
        this.coordinatorEmail = coordinatorEmail;
    }

    public List<MaintenanceCardDetailStatusHistoryDTO> getMaintenanceCardDetailStatusHistories() {
        return maintenanceCardDetailStatusHistories;
    }

    public void setMaintenanceCardDetailStatusHistories(List<MaintenanceCardDetailStatusHistoryDTO> maintenanceCardDetailStatusHistories) {
        this.maintenanceCardDetailStatusHistories = maintenanceCardDetailStatusHistories;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPlatesNumber() {
        return platesNumber;
    }

    public void setPlatesNumber(String platesNumber) {
        this.platesNumber = platesNumber;
    }

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public long getRepairmanId() {
        return repairmanId;
    }

    public void setRepairmanId(long repairmanId) {
        this.repairmanId = repairmanId;
    }

    public String getRepairmanName() {
        return repairmanName;
    }

    public void setRepairmanName(String repairmanName) {
        this.repairmanName = repairmanName;
    }

    public long getCoordinatorId() {
        return coordinatorId;
    }

    public void setCoordinatorId(long coordinatorId) {
        this.coordinatorId = coordinatorId;
    }

    public String getCoordinatorName() {
        return coordinatorName;
    }

    public void setCoordinatorName(String coordinatorName) {
        this.coordinatorName = coordinatorName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public byte getWorkStatus() {
        return workStatus;
    }

    public void setWorkStatus(byte workStatus) {
        this.workStatus = workStatus;
    }

    public byte getPayStatus() {
        return payStatus;
    }

    public void setPayStatus(byte payStatus) {
        this.payStatus = payStatus;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<MaintenanceCardDetailDTO> getMaintenanceCardDetails() {
        return maintenanceCardDetails;
    }

    public void setMaintenanceCardDetails(List<MaintenanceCardDetailDTO> maintenanceCardDetails) {
        this.maintenanceCardDetails = maintenanceCardDetails;
    }

    public List<PaymentHistoryDTO> getPaymentHistories() {
        return paymentHistories;
    }

    public void setPaymentHistories(List<PaymentHistoryDTO> paymentHistories) {
        this.paymentHistories = paymentHistories;
    }
}
