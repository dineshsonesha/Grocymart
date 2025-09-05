package com.dinesh.models;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private double totalAmount;
	private String orderStatus; 
	
	@CreatedDate
	private Instant orderDate;
	
	@ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
	
	@OneToMany
    @JoinColumn(name = "order_id") 
    private List<Cart> carts;
}

