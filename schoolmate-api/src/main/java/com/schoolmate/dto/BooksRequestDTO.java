package com.schoolmate.dto;

import java.util.List;

public class BooksRequestDTO {
    private String year;
    private List<BookDTO> books;

    // Constructors, getters, and setters

    public BooksRequestDTO() {
    }

    public BooksRequestDTO(String year, String standard, List<BookDTO> books) {
        this.year = year;
        this.books = books;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public List<BookDTO> getBooks() {
        return books;
    }

    public void setBooks(List<BookDTO> books) {
        this.books = books;
    }
}
