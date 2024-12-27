package com.yash.NGODonation.service;

import com.yash.NGODonation.entity.CampaignEntity;
import com.yash.NGODonation.enums.Status;
import com.yash.NGODonation.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CampaignServiceImpl implements CampaignService {

    @Autowired
    CampaignRepository campaignRepository;

    @Override
    public CampaignEntity createCampaign(CampaignEntity campaignEntity) {
        return campaignRepository.save(campaignEntity);
    }

    @Override
    public Optional<CampaignEntity> getCampaignById(Integer campaignId) {
        return campaignRepository.findById(campaignId);
    }

    @Override
    public List<CampaignEntity> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    @Override
    public CampaignEntity updateCampaign(Integer campaignId, CampaignEntity campaignEntity) {
        return null;
    }

    @Override
    public void deleteCampaign(Integer campaignId) {
        campaignRepository.deleteById(campaignId);
    }

    @Override
    public List<CampaignEntity> getCampaignsByStatus(Status status) {
        return List.of();
    }

    @Override
    public List<CampaignEntity> updateCampaignStatus(Integer campaignId) {
        return List.of();
    }
}
