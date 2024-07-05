package com.schoolmate;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.schoolmate.dao.UserDao;
import com.schoolmate.model.Role;
import com.schoolmate.model.User;

@SpringBootApplication
public class SchoolmateApiApplication implements CommandLineRunner {

    @Autowired
    private UserDao userDao;

    public static void main(String[] args) {
        SpringApplication.run(SchoolmateApiApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173", "https://jeevan-shikshan-school.netlify.app")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .exposedHeaders("Authorization")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }


    public void run(String... args) {
        User adminAccount = userDao.findByRole(Role.ADMIN);
        if (null == adminAccount) {
            User user = new User();
            user.setEmail("admin@gmail.com");
            user.setFname("Mangesh");
            user.setLname("Poskar");
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
                Date dob = dateFormat.parse("1990-01-01T00:00:00.000+00:00");
                user.setDob(dob);
            } catch (ParseException e) {
                throw new RuntimeException("Error parsing date", e);
            }

            user.setPhone("1234567890");
            user.setPassword(new BCryptPasswordEncoder().encode("admin@123"));
            user.setPosition("admin");
            user.setRole(Role.ADMIN);
            userDao.save(user);
        }
    }
}