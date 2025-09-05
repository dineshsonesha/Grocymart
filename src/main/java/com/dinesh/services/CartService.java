package com.dinesh.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dinesh.models.Cart;
import com.dinesh.models.Product;
import com.dinesh.models.User;
import com.dinesh.repositories.CartRepository;
import com.dinesh.repositories.ProductRepository;
import com.dinesh.repositories.UserRepository;
import com.dinesh.responseWrapper.MyresponseWrapper;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private MyresponseWrapper responseWrapper;

    public ResponseEntity<?> addToCart(Long userId, Long productId, int quantity) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Product> productOpt = productRepository.findById(productId);
        if (!userOpt.isPresent()) {
            responseWrapper.setMessage("User not found with ID: " + userId);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
        if (!productOpt.isPresent()) {
            responseWrapper.setMessage("Product not found with ID: " + productId);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
        Optional<Cart> existingCartOpt = cartRepository.findByUserIdAndProductIdAndOrderIsNull(userId, productId);
        if (existingCartOpt.isPresent()) {
            Cart existingCart = existingCartOpt.get();
            existingCart.setQuantity(existingCart.getQuantity() + quantity);
            existingCart.setTotalPrice(existingCart.getProduct().getPrice() * existingCart.getQuantity());
            Cart updatedCart = cartRepository.save(existingCart);
            responseWrapper.setMessage("Cart item quantity updated");
            responseWrapper.setData(updatedCart);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            Cart newCart = new Cart();
            newCart.setUser(userOpt.get());
            newCart.setProduct(productOpt.get());
            newCart.setQuantity(quantity);
            newCart.setTotalPrice(productOpt.get().getPrice() * quantity);
            Cart savedCart = cartRepository.save(newCart);
            responseWrapper.setMessage("Product added to cart successfully");
            responseWrapper.setData(savedCart);
            return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
        }
    }
    
    public ResponseEntity<?> getUserCart(Long userId) {
        if (!userRepository.existsById(userId)) {
            responseWrapper.setMessage("User not found with ID: " + userId);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
        List<Cart> cartItems = cartRepository.findByUserIdAndOrderIsNull(userId);
        if (cartItems.isEmpty()) {
            responseWrapper.setMessage("No items found in cart for user ID: " + userId);
            responseWrapper.setData(cartItems);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }
        responseWrapper.setMessage("Cart items retrieved successfully");
        responseWrapper.setData(cartItems);
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }

    public ResponseEntity<?> updateCartItem(Long cartId, int quantity) {
        Optional<Cart> cartOpt = cartRepository.findById(cartId);
        if (!cartOpt.isPresent()) {
            responseWrapper.setMessage("Cart item not found with ID: " + cartId);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
        Cart cart = cartOpt.get();
        cart.setQuantity(quantity);
        cart.setTotalPrice(cart.getProduct().getPrice() * quantity);
        Cart updatedCart = cartRepository.save(cart);
        responseWrapper.setMessage("Cart item updated successfully");
        responseWrapper.setData(updatedCart);
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }

    public ResponseEntity<?> deleteCartItem(Long cartId) {
        if (!cartRepository.existsById(cartId)) {
            responseWrapper.setMessage("Cart item not found with ID: " + cartId);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
        cartRepository.deleteById(cartId);
        responseWrapper.setMessage("Cart item deleted successfully");
        responseWrapper.setData(null);
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }
    
    public ResponseEntity<?> clearCart(Long userId) {
        if (!userRepository.existsById(userId)) {
            responseWrapper.setMessage("User not found with ID: " + userId);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
        List<Cart> userCartItems = cartRepository.findByUserIdAndOrderIsNull(userId);
        if (userCartItems.isEmpty()) {
            responseWrapper.setMessage("Cart is already empty for user ID: " + userId);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }
        cartRepository.deleteAll(userCartItems);
        responseWrapper.setMessage("Cart cleared successfully for user ID: " + userId);
        responseWrapper.setData(null);
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }
}