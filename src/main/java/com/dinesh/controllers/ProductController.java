package com.dinesh.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dinesh.models.Product;
import com.dinesh.services.ProductService;

@RestController
@CrossOrigin("*")
public class ProductController {
	 @Autowired
	 private ProductService productService;

     @PostMapping("/category/{categoryId}/products")
     public ResponseEntity<?> createProductWithCategory(@PathVariable Long categoryId, @RequestBody Product product) {
         return productService.createProductWithCategory(product, categoryId);
     }

	 @GetMapping("/products/all")
	 public ResponseEntity<?> getAllProducts() {
       return productService.getAllProducts();
	 }
	 
	 @GetMapping("/products/categories/{categoryId}")
	 public ResponseEntity<?> getProductByCategoryId(@PathVariable Long categoryId) {
	    return productService.getProductByCategoryId(categoryId);
	 }
	 
	 @GetMapping("/products/{productId}")
	 public ResponseEntity<?> getProductByProductId(@PathVariable Long productId) {
	     return productService.getProductByProductId(productId);
	 }

	 @PutMapping("/products/update/{id}")
	 public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product product) {
	    return productService.updateProduct(id, product);
	 }

	 @DeleteMapping("/products/delete/{id}")
	 public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
	    return productService.deleteProduct(id);
	 }
}
