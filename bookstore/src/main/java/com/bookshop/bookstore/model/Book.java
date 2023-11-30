package com.bookshop.bookstore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import javax.persistence.Transient;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Book {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String author;
    private String cost;

    @Column(length = 1000)
    private String description;

    @Transient
    private boolean selectedForPurchase;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCost() {
        return cost;
    }

    public void setCost(String cost) {
        this.cost = cost;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isSelectedForPurchase() {
        return selectedForPurchase;
    }

    public void setSelectedForPurchase(boolean selectedForPurchase) {
        this.selectedForPurchase = selectedForPurchase;
    }
}
