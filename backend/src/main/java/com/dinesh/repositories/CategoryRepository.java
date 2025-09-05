package com.dinesh.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinesh.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	
}
