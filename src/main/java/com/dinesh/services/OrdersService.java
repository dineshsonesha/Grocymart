package com.dinesh.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dinesh.models.Cart;
import com.dinesh.models.Orders;
import com.dinesh.models.User;
import com.dinesh.repositories.CartRepository;
import com.dinesh.repositories.OrdersRepository;
import com.dinesh.repositories.UserRepository;
import com.dinesh.responseWrapper.MyresponseWrapper;

@Service
public class OrdersService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrdersRepository orderRepository;

    @Autowired
    private MyresponseWrapper responseWrapper;

    // ✅ Place an order
    public ResponseEntity<?> placeOrder(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            responseWrapper.setMessage("User not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }

        List<Cart> cartItems = cartRepository.findByUserIdAndOrderIsNull(userId);
        if (cartItems.isEmpty()) {
            responseWrapper.setMessage("Cart is empty");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
        }

        double total = cartItems.stream().mapToDouble(Cart::getTotalPrice).sum();

        Orders order = new Orders();
        order.setUser(userOpt.get());
        order.setOrderStatus("PENDING");
        order.setTotalAmount(total);
        order.setCarts(cartItems);

        Orders savedOrder = orderRepository.save(order);

        for (Cart cart : cartItems) {
            cart.setOrder(savedOrder);
        }
        cartRepository.saveAll(cartItems);

        responseWrapper.setMessage("Order placed successfully");
        responseWrapper.setData(savedOrder);
        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
    }

    // ✅ Fetch all orders (Admin)
    public ResponseEntity<?> getAllOrders() {
        List<Orders> orders = orderRepository.findAll();
        responseWrapper.setMessage("List of all orders");
        responseWrapper.setData(orders);
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }

    // ✅ Fetch orders for a specific user
    public ResponseEntity<?> getOrdersByUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            responseWrapper.setMessage("User not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }

        List<Orders> userOrders = orderRepository.findByUserIdOrderByOrderDateDesc(userId);

        if (userOrders.isEmpty()) {
            responseWrapper.setMessage("No orders found for user");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }

        responseWrapper.setMessage("List of user orders");
        responseWrapper.setData(userOrders);
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }

    // ✅ Update order status (Admin)
    public ResponseEntity<?> updateOrderStatus(Long orderId, String newStatus) {
        Optional<Orders> existingOrder = orderRepository.findById(orderId);

        if (!existingOrder.isPresent()) {
            responseWrapper.setMessage("Order not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }

        Orders order = existingOrder.get();
        order.setOrderStatus(newStatus.toUpperCase());
        orderRepository.save(order);

        responseWrapper.setMessage("Order status updated successfully");
        responseWrapper.setData(order);
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }

    // ✅ Delete order (Admin or User cancel)
    public ResponseEntity<?> deleteOrder(Long id) {
        Optional<Orders> existing = orderRepository.findById(id);
        if (existing.isPresent()) {
            orderRepository.deleteById(id);
            responseWrapper.setMessage("Order deleted successfully");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Order not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }
}
