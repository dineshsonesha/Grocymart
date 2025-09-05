package com.dinesh.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String title;
	private String imageUrl;
	private String description;
	private String unit; // kg, gm, pcs, dozen
	private double price;
	private int stock;

	@ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
	
	@OneToMany(mappedBy = "product")
	@JsonIgnore
    private List<Cart> carts;
	
}
