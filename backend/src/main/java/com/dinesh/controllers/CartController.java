package com.dinesh.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dinesh.services.CartService;

@RestController
@CrossOrigin("*")
public class CartController {
	@Autowired
    private CartService cartService;

    @PostMapping("/cart/add")
    public ResponseEntity<?> addToCart(@RequestParam Long userId, @RequestParam Long productId, @RequestParam int quantity) {
        return cartService.addToCart(userId, productId, quantity);
    }

    @GetMapping("/cart/{userId}")
    public ResponseEntity<?> getUserCart(@PathVariable Long userId) {
        return cartService.getUserCart(userId);
    }

    @PutMapping("/cart/update/{cartId}")
    public ResponseEntity<?> updateCartItem(@PathVariable Long cartId, @RequestParam int quantity) {
        return cartService.updateCartItem(cartId, quantity);
    }

    @DeleteMapping("/cart/delete/{cartId}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long cartId) {
        return cartService.deleteCartItem(cartId);
    }

    @DeleteMapping("/cart/clear/{userId}")
    public ResponseEntity<?> clearCart(@PathVariable Long userId) {
        return cartService.clearCart(userId);
    }

}
