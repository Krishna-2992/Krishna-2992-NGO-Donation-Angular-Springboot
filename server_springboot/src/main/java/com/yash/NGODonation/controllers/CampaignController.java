package com.yash.NGODonation.controllers;

import com.yash.NGODonation.entity.CampaignEntity;
import com.yash.NGODonation.service.CampaignService;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/campaigns")
@CrossOrigin(origins = "*")
public class CampaignController {
    @Autowired
    private CampaignService campaignService;

    @PostMapping
    public CampaignEntity createCampaign(@RequestBody CampaignEntity campaign) {
        System.out.println("campaign:---------" + campaign);
        return campaignService.createCampaign(campaign);
    }

    @GetMapping
    public ResponseEntity<List<CampaignEntity>> getAllCampaigns() {
        List<CampaignEntity> campaigns = campaignService.getAllCampaigns();
        if(!campaigns.isEmpty()) {
            return new ResponseEntity<>(campaigns, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampaignEntity> getCampaignById(@PathVariable("id") int id) {
        Optional<CampaignEntity> campaign = campaignService.getCampaignById(id);
        if(campaign.isPresent()) {
            return new ResponseEntity<>(campaign.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
