package com.schoolmate.service.impl;

import com.schoolmate.dao.MidDayMealDao;
import com.schoolmate.dto.MDMRequestDTO;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.model.MidDayMeal;
import com.schoolmate.service.MidDayMealService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MidDayMealServiceImpl implements MidDayMealService {

    private final MidDayMealDao mealDao;

    public MidDayMealServiceImpl(MidDayMealDao mealDao) {
        this.mealDao = mealDao;
    }

    @Override
    public List<MidDayMeal> getAllData() {
        return mealDao.findAll();
    }

    @Override
    public MidDayMeal getDataByYearAndMonth(MDMRequestDTO request) {
        return mealDao.findByYearAndMonth(request.getYear(), request.getMonth());
    }

    @Override
    public ResponseEntity<MessageResponse> addMidDayMeal(MidDayMeal midDayMeal) {
        MidDayMeal existingMeal = mealDao.findByYearAndMonth(midDayMeal.getYear(), midDayMeal.getMonth());
        if (existingMeal != null) {
            // If meal data already exists, return unsuccessful response
            MessageResponse response = new MessageResponse();
            response.setSuccessful(false);
            return ResponseEntity.ok(response);
        } else {
            // Save the meal data
            MidDayMeal savedMeal = mealDao.save(midDayMeal);

            if (savedMeal != null) {
                // Return successful response
                MessageResponse response = new MessageResponse();
                response.setSuccessful(true);
                return ResponseEntity.ok(response);
            } else {
                // Handle error case if saving fails
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Override
    public ResponseEntity<MessageResponse> updateMidDayMeal(MidDayMeal updatedMeal) {
        MidDayMeal existingMeal = mealDao.findByYearAndMonth(updatedMeal.getYear(), updatedMeal.getMonth());

        // Check if the existing meal is found
        if (existingMeal != null) {
            // Update the existing meal with the new data
            existingMeal.setTotalStudents(updatedMeal.getTotalStudents());
            existingMeal.setWorkingDays(updatedMeal.getWorkingDays());
            existingMeal.setTandul(updatedMeal.getTandul());
            existingMeal.setTurdal(updatedMeal.getTurdal());
            existingMeal.setMugdal(updatedMeal.getMugdal());
            existingMeal.setHarbhara(updatedMeal.getHarbhara());
            existingMeal.setMug(updatedMeal.getMug());
            existingMeal.setChavli(updatedMeal.getChavli());
            existingMeal.setVatana(updatedMeal.getVatana());
            existingMeal.setOil(updatedMeal.getOil());
            existingMeal.setTikhat(updatedMeal.getTikhat());
            existingMeal.setGaramMasala(updatedMeal.getGaramMasala());
            existingMeal.setMith(updatedMeal.getMith());
            existingMeal.setHalad(updatedMeal.getHalad());
            existingMeal.setJira(updatedMeal.getJira());
            existingMeal.setMohri(updatedMeal.getMohri());

            // Save the updated meal
            MidDayMeal savedMeal = mealDao.save(existingMeal);

            if (savedMeal != null) {
                // Return success response
                MessageResponse response = new MessageResponse();
                response.setSuccessful(true);
                return ResponseEntity.ok(response);
            } else {
                // Handle error case if saving fails
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            // If the meal with the given year and standard does not exist, return a not found response
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Override
    public ResponseEntity<MessageResponse> deleteMidDayMeal(MDMRequestDTO request) {
        // Find the midday meal data by year and month
        MidDayMeal mealToDelete = mealDao.findByYearAndMonth(request.getYear(), request.getMonth());

        if (mealToDelete != null) {
            // If midday meal data exists for the given year and month, delete it
            mealDao.delete(mealToDelete);

            // Return success response
            MessageResponse response = new MessageResponse();
            response.setSuccessful(true);
            return ResponseEntity.ok(response);
        } else {
            // If no midday meal data exists for the given year and month, return a not found response
            MessageResponse response = new MessageResponse();
            response.setSuccessful(false);
            return ResponseEntity.ok(response);
        }
    }

    @Override
    public List<String> getDistinctYears() {
        List<MidDayMeal> meals = mealDao.findAll();
        return meals.stream()
                .map(MidDayMeal::getYear)
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getDistinctMonths() {
        List<MidDayMeal> meals = mealDao.findAll();
        return meals.stream()
                .map(MidDayMeal::getMonth)
                .distinct()
                .collect(Collectors.toList());
    }

}
