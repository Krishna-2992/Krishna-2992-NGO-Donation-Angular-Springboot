package com.yash.NGODonation.repository;

import com.yash.NGODonation.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    @Query("SELECT u FROM UserEntity u WHERE u.loginName = :loginName AND u.password = :password")
    Optional<UserEntity> findByUsernameAndPassword(@Param("loginName") String loginName, @Param("password") String password);

    Optional<UserEntity> findByloginNameAndPassword(String loginName, String rawPassword);

//    Optional<UserEntity> findByLoginName(String loginName);
}
