package com.nk.maintenancecard.dto;

import com.nk.maintenancecard.entity.MaintenanceCard;
import com.nk.maintenancecard.entity.MaintenanceCardDetailStatusHistory;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

public class MaintenanceCardDetailDTO extends BaseDTO {

    private MaintenanceCardDTO maintenanceCard;

    private long productId;

    private String productName;

    private String productCode;

    private String productImage;

    private String productUnit;

    private byte productType;

    private byte status;

    private BigDecimal price;

    private int quantity;

    private List<MaintenanceCardDetailStatusHistoryDTO> maintenanceCardDetailStatusHistories;

    public List<MaintenanceCardDetailStatusHistoryDTO> getMaintenanceCardDetailStatusHistories() {
        return maintenanceCardDetailStatusHistories;
    }

    public void setMaintenanceCardDetailStatusHistories(List<MaintenanceCardDetailStatusHistoryDTO> maintenanceCardDetailStatusHistories) {
        this.maintenanceCardDetailStatusHistories = maintenanceCardDetailStatusHistories;
    }

    public MaintenanceCardDTO getMaintenanceCard() {
        return maintenanceCard;
    }

    public void setMaintenanceCard(MaintenanceCardDTO maintenanceCard) {
        this.maintenanceCard = maintenanceCard;
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public String getProductUnit() {
        return productUnit;
    }

    public void setProductUnit(String productUnit) {
        this.productUnit = productUnit;
    }

    public byte getProductType() {
        return productType;
    }

    public void setProductType(byte productType) {
        this.productType = productType;
    }

    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
