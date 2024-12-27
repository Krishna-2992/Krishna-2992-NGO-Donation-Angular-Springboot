package com.yash.NGODonation.entity;

import com.yash.NGODonation.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import javax.annotation.processing.Generated;
import java.time.LocalDate;

@Entity
@Table(name="campaigns")
public class CampaignEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "column_id")
    private Integer campaignId;

    @NotBlank(message = "Title cannot be blank")
    @Size(max = 100, message = "Title must be less than 100 characters")
    @Column(name = "title")
    private String title;

    @NotBlank(message = "Description cannot be blank")
    @Size(max = 100, message = "Description must be less than 100 characters")
    @Column(name = "description")
    private String description;

    @NotBlank
    @Column(name = "fund_raised")
    private String fundRaised;

    @NotBlank
    @Column(name = "target_amount")
    private String targetAmount;

    @NotNull(message = "Start date cannot be null")
    @Column(name = "start_date")
    private LocalDate startDate;

    @NotNull(message = "End date cannot be null")
    @Column(name = "end_date")
    private LocalDate endDate;

    @NotNull
    @Enumerated(EnumType.STRING) // Store the enum as a string in the database
    @Column(name = "status")
    private Status status;

    @Column(name = "icon")
    private String icon;

    public Integer getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Integer campaignId) {
        this.campaignId = campaignId;
    }

    public @NotBlank(message = "Title cannot be blank") @Size(max = 100, message = "Title must be less than 100 characters") String getTitle() {
        return title;
    }

    public void setTitle(@NotBlank(message = "Title cannot be blank") @Size(max = 100, message = "Title must be less than 100 characters") String title) {
        this.title = title;
    }

    public @NotBlank(message = "Description cannot be blank") @Size(max = 100, message = "Description must be less than 100 characters") String getDescription() {
        return description;
    }

    public void setDescription(@NotBlank(message = "Description cannot be blank") @Size(max = 100, message = "Description must be less than 100 characters") String description) {
        this.description = description;
    }

    public @NotBlank String getFundRaised() {
        return fundRaised;
    }

    public void setFundRaised(@NotBlank String fundRaised) {
        this.fundRaised = fundRaised;
    }

    public @NotBlank String getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(@NotBlank String targetAmount) {
        this.targetAmount = targetAmount;
    }

    public @NotNull(message = "Start date cannot be null") LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(@NotNull(message = "Start date cannot be null") LocalDate startDate) {
        this.startDate = startDate;
    }

    public @NotNull(message = "End date cannot be null") LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(@NotNull(message = "End date cannot be null") LocalDate endDate) {
        this.endDate = endDate;
    }

    public @NotNull Status getStatus() {
        return status;
    }

    public void setStatus(@NotNull Status status) {
        this.status = status;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    @Override
    public String toString() {
        return "CampaignEntity{" +
                "status=" + status +
                ", userId=" + campaignId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", fundRaised='" + fundRaised + '\'' +
                ", targetAmount='" + targetAmount + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", icon='" + icon + '\'' +
                '}';
    }

}
