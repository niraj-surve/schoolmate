package com.schoolmate.service.impl;

import com.schoolmate.dao.BooksDao;
import com.schoolmate.dto.BookByYearDTO;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.model.Books;
import com.schoolmate.model.MidDayMeal;
import com.schoolmate.service.BooksService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BooksServiceImpl implements BooksService {

    private final BooksDao booksDao;

    public BooksServiceImpl(BooksDao booksDao) {
        this.booksDao = booksDao;
    }

    @Override
    public List<Books> getAllData() {
        return booksDao.findAll();
    }

    @Override
    public Books getDataByYear(BookByYearDTO request) {
        return booksDao.findByYear(request.getYear());
    }

    @Override
    public ResponseEntity<MessageResponse> addBooksData(Books books) {
        // Check if the data already exists
        Books existingBooks = booksDao.findByYear(books.getYear());

        if (existingBooks != null) {
            // If data already exists, return unsuccessful response
            MessageResponse response = new MessageResponse();
            response.setSuccessful(false);
            return ResponseEntity.ok(response);
        } else {
            // Save the books data
            booksDao.save(books);

            // Return successful response
            MessageResponse response = new MessageResponse();
            response.setSuccessful(true);
            return ResponseEntity.ok(response);
        }
    }

    @Override
    public ResponseEntity<MessageResponse> updateBooksData(Books books) {
        // Check if the data already exists
        Books existingBooks = booksDao.findByYear(books.getYear());

        if (existingBooks != null) {
            // Update the existing books data with the new data
            existingBooks.setBooks(books.getBooks());

            // Save the updated books data
            booksDao.save(existingBooks);

            // Return successful response
            MessageResponse response = new MessageResponse();
            response.setSuccessful(true);
            return ResponseEntity.ok(response);
        } else {
            // If data does not exist, return unsuccessful response
            MessageResponse response = new MessageResponse();
            response.setSuccessful(false);
            return ResponseEntity.ok(response);
        }
    }


    @Override
    public ResponseEntity<MessageResponse> deleteBooksData(BookByYearDTO request) {
        // Check if the data exists
        Books existingBooks = booksDao.findByYear(request.getYear());

        if (existingBooks != null) {
            // Delete the books data
            booksDao.delete(existingBooks);

            // Return successful response
            MessageResponse response = new MessageResponse();
            response.setSuccessful(true);
            return ResponseEntity.ok(response);
        } else {
            // If data does not exist, return unsuccessful response
            MessageResponse response = new MessageResponse();
            response.setSuccessful(false);
            return ResponseEntity.ok(response);
        }
    }

    @Override
    public List<String> getDistinctYears() {
        List<Books> books = booksDao.findAll();
        return books.stream()
                .map(Books::getYear)
                .distinct()
                .collect(Collectors.toList());
    }
}
