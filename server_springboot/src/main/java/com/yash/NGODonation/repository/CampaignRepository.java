package com.yash.NGODonation.repository;

import com.yash.NGODonation.entity.CampaignEntity;
import com.yash.NGODonation.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CampaignRepository extends JpaRepository<CampaignEntity, Integer> {
    @Query("UPDATE CampaignEntity c SET c.fundRaised = c.fundRaised + :fr WHERE c.campaignId = :campaignId")
    @Modifying
    @Transactional
    int updateFundRaised(@Param("fr") double fr, @Param("campaignId") long campaignId);
}
