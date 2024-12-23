package com.yash.NGODonation.repository;

import com.yash.NGODonation.entity.DonationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationRepository extends JpaRepository<DonationEntity, Integer> {
}
