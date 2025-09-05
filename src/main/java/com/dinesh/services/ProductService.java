package com.dinesh.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dinesh.models.Category;
import com.dinesh.models.Product;
import com.dinesh.repositories.CategoryRepository;
import com.dinesh.repositories.ProductRepository;
import com.dinesh.responseWrapper.MyresponseWrapper;

@Service
public class ProductService {
	@Autowired
    private ProductRepository productRepository;
	@Autowired
	private CategoryRepository categoryRepository;
    @Autowired
    private MyresponseWrapper responseWrapper;

    public ResponseEntity<?> createProductWithCategory(Product product, Long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isPresent()) {
            product.setCategory(optionalCategory.get());
            Product savedProduct = productRepository.save(product);
            responseWrapper.setMessage("Product added to category successfully");
            responseWrapper.setData(savedProduct);
            return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
        } else {
            responseWrapper.setMessage("Category not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }
    
    public ResponseEntity<?> getAllProducts() {
        List<Product> products = productRepository.findAll();
        responseWrapper.setMessage("List of all products");
        responseWrapper.setData(products);
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }
    
    public ResponseEntity<?> getProductByCategoryId(Long categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        if (products.isEmpty()) {
            responseWrapper.setMessage("No products found for category ID: " + categoryId);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }
        responseWrapper.setMessage("Products found for category ID: " + categoryId);
        responseWrapper.setData(products);
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }
    
    public ResponseEntity<?> getProductByProductId(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            responseWrapper.setMessage("Product found");
            responseWrapper.setData(product.get());
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }
        responseWrapper.setMessage("Product not found");
        responseWrapper.setData(null);
        return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> updateProduct(Long id, Product product) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            if (product.getCategory() == null) {
                product.setCategory(existingProduct.get().getCategory());
            }
            product.setId(id);
            Product updatedProduct = productRepository.save(product);
            responseWrapper.setMessage("Product with ID " + id + " updated successfully.");
            responseWrapper.setData(updatedProduct);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }
        responseWrapper.setMessage("Product not found with ID " + id);
        responseWrapper.setData(null);
        return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> deleteProduct(Long id) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            productRepository.deleteById(id);
            responseWrapper.setMessage("Product deleted successfully");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Product not found with ID " + id);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }
	
}
