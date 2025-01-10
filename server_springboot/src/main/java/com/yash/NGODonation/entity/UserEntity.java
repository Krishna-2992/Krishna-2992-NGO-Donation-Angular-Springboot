package com.yash.NGODonation.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @NotBlank(message = "Name cannot be blank")
    @Size(max = 100, message = "Name must be less than 100 characters")
    @Column(name = "name")
    private String name;

    @NotBlank
    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
    @Column(name = "phone", unique = true)
    private String phone;

    @Email(message = "Invalid email format")
    @Column(name = "email")
    private String email;

    @Size(max = 255, message = "Address must be less than 255 characters")
    @Column(name = "address")
    private String address;

    @NotBlank(message = "Login name cannot be blank")
    @Size(min = 4, max = 50, message = "Login name must be between 4 and 50 characters")
    @Column(name = "login_name", unique = true)
    private String loginName;

    @NotBlank(message = "Password cannot be blank")
    @Column(name = "password")
    private String password;

    @NotBlank(message = "Role cannot be blank")
    @Column(name = "role")
    private String role;

    @NotBlank
    @Pattern(regexp = "^[A-Z]{5}\\d{4}[A-Z]{1}$", message = "Invalid PAN number format")
    @Column(name = "pan_number", unique = true)
    private String panNumber;

    // Constructors
    public UserEntity() {
    }

    public UserEntity(String name, String phone, String email, String address,
                      String loginName, String password, String role, String panNumber) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.loginName = loginName;
        this.password = password;
        this.role = role;
        this.panNumber = panNumber;
    }

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return loginName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", loginName='" + loginName + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", panNumber='" + panNumber + '\'' +
                '}';
    }


}