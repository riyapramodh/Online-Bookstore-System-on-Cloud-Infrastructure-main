package com.bookshop.bookstore.repository;

import com.bookshop.bookstore.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingOrAuthorContaining(String title, String author);

    // New method for fetching all book titles
    @Query("SELECT DISTINCT b.title FROM Book b")
    List<String> findAllTitles();

    // New method for fetching a book by title
    Optional<Book> findByTitle(String title);


}
