package com.yash.NGODonation.controllers;

import com.yash.NGODonation.entity.DonationEntity;
import com.yash.NGODonation.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donations")
@CrossOrigin(origins = "*")
public class DonationController {
    @Autowired
    public DonationService donationService;

    @PostMapping
    public DonationEntity createDonation(@RequestBody DonationEntity donation) {
        System.out.println("----Create donation----");
        System.out.println(donation);
        return donationService.addDonation(donation);
    }

    @GetMapping
    public List<DonationEntity> getAllDonations() {
        return donationService.getAllDoantion();
    }
}
