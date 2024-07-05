package com.schoolmate.service;

import com.schoolmate.dto.BookByYearDTO;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.model.Books;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BooksService {
    List<Books> getAllData();

    Books getDataByYear(BookByYearDTO request);

    ResponseEntity<MessageResponse> addBooksData(Books books);

    ResponseEntity<MessageResponse> updateBooksData(Books books);

    ResponseEntity<MessageResponse> deleteBooksData(BookByYearDTO request);

    List<String> getDistinctYears();
}