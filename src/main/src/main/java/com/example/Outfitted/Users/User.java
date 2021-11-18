package com.example.Outfitted.Users;

import org.springframework.stereotype.Component;

@Component
public class User {
    private static String name;
    private static String age;
    private static String city;

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

    @Override
    public String toString(){
        String userString = "name: " + this.name + " city: " + this.city + " age: " + this.age;
        return userString;
    }
}

