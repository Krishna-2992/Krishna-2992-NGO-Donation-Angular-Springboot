package com.yash.NGODonation.controllers;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @GetMapping("/create-order")
    public String createOrder(@PathVariable("amount") int amount, @PathVariable("userId") int userId) {
        System.out.println("inside create user!!!");
        try {
            System.out.println("amount:" + amount);
            System.out.println("userId: " + userId);

            String orderId = paymentService.createOrder(amount, "INR", "receipt_" + System.currentTimeMillis());

            // Add all necessary attributes
            model.addAttribute("orderId", orderId);
            model.addAttribute("amount", amount);
            model.addAttribute("razorpayKeyId", razorpayKeyId);
            model.addAttribute("currency", "INR");

            // Print debug information
            System.out.println("Order created with ID: " + orderId);
            System.out.println("Amount: " + amount);
            System.out.println("Key ID: " + razorpayKeyId);

            return "payment";
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "Error creating order: " + e.getMessage());
            return "error";
        }
    }


}
