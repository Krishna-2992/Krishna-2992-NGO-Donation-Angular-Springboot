package com.yash.NGODonation.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="donations")
public class DonationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="donation_id")
    private Integer donationId;

    @Column(name="donor_id")
    private Integer donorId;

    @Column(name="amount")
    private Integer amount;

    @Column(name="campaign_id")
    private Integer campaignId;

    @Column(name="donation_date")
    private LocalDate donationDate;

    public Integer getDonationId() {
        return donationId;
    }

    public void setDonationId(Integer donationId) {
        this.donationId = donationId;
    }

    public Integer getDonorId() {
        return donorId;
    }

    public void setDonorId(Integer donorId) {
        this.donorId = donorId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Integer campaignId) {
        this.campaignId = campaignId;
    }

    public LocalDate getDonationDate() {
        return donationDate;
    }

    public void setDonationDate(LocalDate donationDate) {
        this.donationDate = donationDate;
    }
}
