package com.yash.NGODonation.controllers;

import com.yash.NGODonation.entity.DonationEntity;
import com.yash.NGODonation.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/donation")
public class DonationController {
    @Autowired
    public DonationService donationService;

//    @PostMapping
//    public DonationEntity createDonation() {
//
//    }
}
