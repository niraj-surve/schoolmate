package com.schoolmate.service;

import com.schoolmate.dto.UniformRequestDTO;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.model.Uniform;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UniformService {
    List<Uniform> getAllUniforms();

    Uniform getUniformByYearAndStandard(UniformRequestDTO request);

    ResponseEntity<MessageResponse> addUniform(Uniform uniform);

    ResponseEntity<MessageResponse> updateUniform(Uniform updatedUniform);

    ResponseEntity<MessageResponse> deleteUniform(UniformRequestDTO request);

    List<String> getDistinctYears();

    List<String> getDistinctStandards();
}
