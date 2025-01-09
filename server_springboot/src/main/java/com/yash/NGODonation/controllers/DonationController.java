package com.yash.NGODonation.controllers;

import com.yash.NGODonation.entity.DonationEntity;
import com.yash.NGODonation.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donations")
@CrossOrigin(origins = "*")
public class DonationController {
    @Autowired
    public DonationService donationService;

    @PostMapping
    public ResponseEntity<DonationEntity> createDonation(@RequestBody DonationEntity donation) {
        System.out.println("----Create donation----");
        System.out.println(donation);
        DonationEntity donationEntity = donationService.addDonation(donation);
        return new ResponseEntity<>(donationEntity, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<DonationEntity>> getAllDonations() {
        return new ResponseEntity<>(donationService.getAllDoantion(), HttpStatus.OK);
    }
}
