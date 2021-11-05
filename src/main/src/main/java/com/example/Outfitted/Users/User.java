package com.example.Outfitted.Users;

import org.springframework.stereotype.Component;

@Component
public class User {
    private String name;

    private String age;

    private String city;

    public User() {
        this.name ="";
        this.age = "";
        this.city = "";
    }
    public User(String name, String age, String city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


}

