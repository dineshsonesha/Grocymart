package com.dinesh.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class User {
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String email;
    private String password;
    private String address;
    private String phoneNo;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Cart> cart;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Orders> orders;
}
