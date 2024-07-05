package com.schoolmate.service;

import com.schoolmate.dto.MDMRequestDTO;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.model.MidDayMeal;
import com.schoolmate.model.Notice;
import com.schoolmate.model.Staff;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MidDayMealService {
    List<MidDayMeal> getAllData();

    MidDayMeal getDataByYearAndMonth(MDMRequestDTO request);

    ResponseEntity<MessageResponse> addMidDayMeal(MidDayMeal midDayMeal);

    ResponseEntity<MessageResponse> updateMidDayMeal(MidDayMeal updatedMeal);

    ResponseEntity<MessageResponse> deleteMidDayMeal(MDMRequestDTO request);

    List<String> getDistinctYears();

    List<String> getDistinctMonths();
}