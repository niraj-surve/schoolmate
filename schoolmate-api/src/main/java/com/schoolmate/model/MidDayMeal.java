package com.schoolmate.model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "mid-day-meal")
public class MidDayMeal {
    private ObjectId id;

    @Field(value = "year")
    private String year;

    @Field(value = "month")
    private String month;

    @Field(value = "standard")
    private String standard;

    @Field(value = "totalStudents")
    private int totalStudents;

    @Field(value = "workingDays")
    private int workingDays;

    @Field(value = "tandul")
    private float tandul;

    @Field(value = "turdal")
    private float turdal;

    @Field(value = "mugdal")
    private float mugdal;

    @Field(value = "harbhara")
    private float harbhara;

    @Field(value = "mug")
    private float mug;

    @Field(value = "chavli")
    private float chavli;

    @Field(value = "vatana")
    private float vatana;

    @Field(value = "oil")
    private float oil;

    @Field(value = "tikhat")
    private float tikhat;


    @Field(value = "garamMasala")
    private float garamMasala;

    @Field(value = "mith")
    private float mith;

    @Field(value = "halad")
    private float halad;

    @Field(value = "jira")
    private float jira;

    @Field(value = "mohri")
    private float mohri;

    public MidDayMeal() {
    }

    public MidDayMeal(ObjectId id, String year, String month, String standard, int totalStudents, int workingDays, float tandul, float turdal, float mugdal, float harbhara, float mug, float chavli, float vatana, float oil, float tikhat, float garamMasala, float mith, float halad, float jira, float mohri) {
        this.id = id;
        this.year = year;
        this.month = month;
        this.standard = standard;
        this.totalStudents = totalStudents;
        this.workingDays = workingDays;
        this.tandul = tandul;
        this.turdal = turdal;
        this.mugdal = mugdal;
        this.harbhara = harbhara;
        this.mug = mug;
        this.chavli = chavli;
        this.vatana = vatana;
        this.oil = oil;
        this.tikhat = tikhat;
        this.garamMasala = garamMasala;
        this.mith = mith;
        this.halad = halad;
        this.jira = jira;
        this.mohri = mohri;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public int getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(int totalStudents) {
        this.totalStudents = totalStudents;
    }

    public int getWorkingDays() {
        return workingDays;
    }

    public void setWorkingDays(int workingDays) {
        this.workingDays = workingDays;
    }

    public float getTandul() {
        return tandul;
    }

    public void setTandul(float tandul) {
        this.tandul = tandul;
    }

    public float getTurdal() {
        return turdal;
    }

    public void setTurdal(float turdal) {
        this.turdal = turdal;
    }

    public float getMugdal() {
        return mugdal;
    }

    public void setMugdal(float mugdal) {
        this.mugdal = mugdal;
    }

    public float getHarbhara() {
        return harbhara;
    }

    public void setHarbhara(float harbhara) {
        this.harbhara = harbhara;
    }

    public float getMug() {
        return mug;
    }

    public void setMug(float mug) {
        this.mug = mug;
    }

    public float getChavli() {
        return chavli;
    }

    public void setChavli(float chavli) {
        this.chavli = chavli;
    }

    public float getVatana() {
        return vatana;
    }

    public void setVatana(float vatana) {
        this.vatana = vatana;
    }

    public float getOil() {
        return oil;
    }

    public void setOil(float oil) {
        this.oil = oil;
    }

    public float getTikhat() {
        return tikhat;
    }

    public void setTikhat(float tikhat) {
        this.tikhat = tikhat;
    }

    public float getGaramMasala() {
        return garamMasala;
    }

    public void setGaramMasala(float garamMasala) {
        this.garamMasala = garamMasala;
    }

    public float getMith() {
        return mith;
    }

    public void setMith(float mith) {
        this.mith = mith;
    }

    public float getHalad() {
        return halad;
    }

    public void setHalad(float halad) {
        this.halad = halad;
    }

    public float getJira() {
        return jira;
    }

    public void setJira(float jira) {
        this.jira = jira;
    }

    public float getMohri() {
        return mohri;
    }

    public void setMohri(float mohri) {
        this.mohri = mohri;
    }
}