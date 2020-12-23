package com.nk.customer.entity;

import javax.persistence.*;

@Entity
@Table(name = "vehicles")
public class Vehicle extends BaseEntity{

    private String color;
    private String model;

    @Column(name = "plate_number")
    private String plateNumber;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
