package com.dinesh.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dinesh.models.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	List<Cart> findByUserIdAndOrderIsNull(Long userId);
	Optional<Cart> findByUserIdAndProductIdAndOrderIsNull(Long userId, Long productId);
}
