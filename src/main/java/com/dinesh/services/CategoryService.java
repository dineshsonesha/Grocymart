package com.dinesh.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dinesh.models.Category;
import com.dinesh.repositories.CategoryRepository;
import com.dinesh.responseWrapper.MyresponseWrapper;

@Service
public class CategoryService {
	@Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private MyresponseWrapper responseWrapper;

    public ResponseEntity<?> createCategory(Category category) {
        Category savedCategory = categoryRepository.save(category);
        responseWrapper.setMessage("Category added successfully");
        responseWrapper.setData(savedCategory);
        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
    }

    public ResponseEntity<?> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        responseWrapper.setMessage("List of all categories");
        responseWrapper.setData(categories);
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }

    public ResponseEntity<?> getCategoryById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            responseWrapper.setMessage("Category found");
            responseWrapper.setData(category.get());
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Category not found with ID " + id);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> updateCategory(Long id, Category category) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            category.setId(id);
            Category updatedCategory = categoryRepository.save(category);
            responseWrapper.setMessage("Category updated successfully");
            responseWrapper.setData(updatedCategory);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Category not found with ID " + id);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteCategory(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            categoryRepository.deleteById(id);
            responseWrapper.setMessage("Category deleted successfully");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Category not found with ID " + id);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

}
