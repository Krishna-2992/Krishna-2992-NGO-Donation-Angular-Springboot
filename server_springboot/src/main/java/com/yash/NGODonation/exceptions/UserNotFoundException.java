package com.yash.NGODonation.exceptions;

import org.apache.catalina.User;

public class UserNotFoundException extends Exception{
    public UserNotFoundException(String msg) {
        super(msg);
    }
}
