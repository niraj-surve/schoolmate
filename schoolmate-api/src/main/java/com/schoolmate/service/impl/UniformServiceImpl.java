package com.schoolmate.service.impl;

import com.schoolmate.dao.UniformDao;
import com.schoolmate.dto.UniformRequestDTO;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.model.Books;
import com.schoolmate.model.Uniform;
import com.schoolmate.service.UniformService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UniformServiceImpl implements UniformService {

    private final UniformDao uniformDao;

    public UniformServiceImpl(UniformDao uniformDao) {
        this.uniformDao = uniformDao;
    }

    @Override
    public List<Uniform> getAllUniforms() {
        return uniformDao.findAll();
    }

    @Override
    public Uniform getUniformByYearAndStandard(UniformRequestDTO request) {
        return uniformDao.findByYearAndStandard(request.getYear(), request.getStandard());
    }

    @Override
    public ResponseEntity<MessageResponse> addUniform(Uniform uniform) {
        Uniform existingUniform = uniformDao.findByYearAndStandard(uniform.getYear(), uniform.getStandard());
        if (existingUniform != null) {
            MessageResponse response = new MessageResponse();
            response.setSuccessful(false);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } else {
            uniformDao.save(uniform);
            MessageResponse response = new MessageResponse();
            response.setSuccessful(true);
            return ResponseEntity.ok(response);
        }
    }


    @Override
    public ResponseEntity<MessageResponse> updateUniform(Uniform updatedUniform) {
        Uniform existingUniform = uniformDao.findByYearAndStandard(updatedUniform.getYear(), updatedUniform.getStandard());

        if (existingUniform != null) {
            existingUniform.setNoOfGirls(updatedUniform.getNoOfGirls());
            existingUniform.setNoOfBoys(updatedUniform.getNoOfBoys());
            existingUniform.setNoOfTotalStudents(updatedUniform.getNoOfTotalStudents());
            existingUniform.setUniformsReceivedByGirls(updatedUniform.getUniformsReceivedByGirls());
            existingUniform.setUniformsReceivedByBoys(updatedUniform.getUniformsReceivedByBoys());
            existingUniform.setUniformToBeReceivedByGirls(updatedUniform.getUniformToBeReceivedByGirls());
            existingUniform.setUniformToBeReceivedByBoys(updatedUniform.getUniformToBeReceivedByBoys());
            existingUniform.setTotalUniformToBeReceived((updatedUniform.getTotalUniformToBeReceived()));
            existingUniform.setStandard(updatedUniform.getStandard());

            uniformDao.save(existingUniform);

            MessageResponse response = new MessageResponse();
            response.setSuccessful(true);
            return ResponseEntity.ok(response);
        } else {
            MessageResponse response = new MessageResponse();
            response.setSuccessful(false);
            return ResponseEntity.ok(response);
        }
    }

    @Override
    public ResponseEntity<MessageResponse> deleteUniform(UniformRequestDTO request) {
        Uniform existingUniform = uniformDao.findByYearAndStandard(request.getYear(), request.getStandard());

        if (existingUniform != null) {
            uniformDao.delete(existingUniform);
            MessageResponse response = new MessageResponse();
            response.setSuccessful(true);
            return ResponseEntity.ok(response);
        } else {
            MessageResponse response = new MessageResponse();
            response.setSuccessful(false);
            return ResponseEntity.ok(response);
        }
    }

    @Override
    public List<String> getDistinctYears() {
        List<Uniform> uniforms = uniformDao.findAll();
        return uniforms.stream()
                .map(Uniform::getYear)
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getDistinctStandards() {
        List<Uniform> uniforms = uniformDao.findAll();
        return uniforms.stream()
                .map(Uniform::getStandard)
                .distinct()
                .collect(Collectors.toList());
    }
}
