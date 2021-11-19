package com.example.Outfitted.Users;

import org.springframework.stereotype.Component;

@Component
public class User {
    private static String name;
    private static String uid;
    private static String closetId;

    public User() {
        this.name ="";
        this.uid = "";
        this.closetId = "";
    }
    public User(String name, String age, String city) {
        this.name = name;
        this.uid = age;
        this.closetId = city;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getUid() {

        return uid;
    }

    public void setUid(String uid) {

        this.uid = uid;
    }

    public String getClosetId() {

        return closetId;
    }

    public void setClosetId(String city) {

        this.closetId = city;
    }

    @Override
    public String toString(){
        String userString = "name: " + this.name + " city: " + this.closetId + " age: " + this.uid;
        return userString;
    }
}

