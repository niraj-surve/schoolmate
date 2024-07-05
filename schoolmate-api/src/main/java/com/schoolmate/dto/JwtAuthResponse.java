package com.schoolmate.dto;

import java.util.Date;

public class JwtAuthResponse {
    private String token;

    private String refreshToken;

    private String position;

    private String standard;

    private String facility;

    private Date expirationTime;

    public JwtAuthResponse() {
    }

    public JwtAuthResponse(String token, String refreshToken, String position, String standard, String facility, Date expirationTime) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.position = position;
        this.standard = standard;
        this.facility = facility;
        this.expirationTime = expirationTime;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public String getFacility() {
        return facility;
    }

    public void setFacility(String facility) {
        this.facility = facility;
    }

    public Date getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(Date expirationTime) {
        this.expirationTime = expirationTime;
    }

}