package com.yash.NGODonation.controllers;

import com.razorpay.RazorpayException;
import com.yash.NGODonation.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@CrossOrigin(origins = "*") // Add this if your Angular app runs on port 4200
@RequestMapping("payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    private String razorpayKeyId = "rzp_test_BZSOgBnXQoiSLs";

    @GetMapping("/create-order")
    @ResponseBody
    public Map<String, Object> createOrder(@RequestParam Integer amount, HttpSession session) {
        try {
            // Store amount in session if needed
            session.setAttribute("amount", amount);

            // Create order
            String orderId = paymentService.createOrder(amount, "INR", "receipt_" + System.currentTimeMillis());

            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("orderId", orderId);
            response.put("amount", amount);
            response.put("razorpayKeyId", razorpayKeyId);
            response.put("currency", "INR");

            return response;

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error creating order: " + e.getMessage());
            return errorResponse;
        }
    }

    @PostMapping("/verify")
    @ResponseBody
    public Map<String, Object> verifyPayment(
            @RequestParam String razorpay_order_id,
            @RequestParam String razorpay_payment_id,
            @RequestParam String razorpay_signature,
            HttpSession session) {

        System.out.println("Verifying payment...");
        System.out.println("Order ID: " + razorpay_order_id);
        System.out.println("Payment ID: " + razorpay_payment_id);

        boolean isValid = paymentService.verifySignature(
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
        );

        Map<String, Object> response = new HashMap<>();
        response.put("success", isValid);

        if (isValid) {
            Integer amount = (Integer) session.getAttribute("amount");
            response.put("redirectUrl", "/donate");
        } else {
            response.put("redirectUrl", "/index?act=pf");
        }

        return response;
    }
}
