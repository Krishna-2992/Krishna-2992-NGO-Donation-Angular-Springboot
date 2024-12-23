package com.yash.NGODonation.service;

import com.yash.NGODonation.entity.DonationEntity;
import com.yash.NGODonation.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DonationService {
    @Autowired
    public DonationRepository donationRepository;


}
