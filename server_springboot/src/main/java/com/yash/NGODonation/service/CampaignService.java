package com.yash.NGODonation.service;

import com.yash.NGODonation.entity.CampaignEntity;
import com.yash.NGODonation.enums.Status;

import java.util.List;
import java.util.Optional;

public interface CampaignService {

    /**
     * Create a new campaign.
     *
     * @param campaignEntity the campaign entity to create
     * @return the created campaign entity
     */
    CampaignEntity createCampaign(CampaignEntity campaignEntity);

    /**
     * Get a campaign by its ID.
     *
     * @param campaignId the ID of the campaign
     * @return an Optional containing the found campaign entity, or empty if not found
     */
    Optional<CampaignEntity> getCampaignById(Integer campaignId);

    /**
     * Get all campaigns.
     *
     * @return a list of all campaign entities
     */
    List<CampaignEntity> getAllCampaigns();

    /**
     * Update an existing campaign.
     *
     * @param campaignId the ID of the campaign to update
     * @param campaignEntity the updated campaign entity
     * @return the updated campaign entity
     */
    CampaignEntity updateCampaign(Integer campaignId, CampaignEntity campaignEntity);

    /**
     * Delete a campaign by its ID.
     *
     * @param campaignId the ID of the campaign to delete
     */
    void deleteCampaign(Integer campaignId);

    /**
     * Get campaigns by status.
     *
     * @param status the status to filter campaigns
     * @return a list of campaigns with the specified status
     */
    List<CampaignEntity> getCampaignsByStatus(Status status);

    /**
     * Update campaign status
     *
     * @param campaignId the status to filter campaigns
     * @return the updated campaign entity
     */
    List<CampaignEntity> updateCampaignStatus(Integer campaignId);

    void updateCampaignFundRaised(double amount, int campaignId);
}