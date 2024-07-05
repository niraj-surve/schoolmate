package com.schoolmate.model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "books")
public class Books {
    private ObjectId id;

    @Field(value = "year")
    private String year;

    @Field(value = "books")
    private List<Book> books;

    public Books(){}

    public Books(ObjectId id, String year, List<Book> books) {
        this.id = id;
        this.year = year;
        this.books = books;
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

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }
}
