package com.example.Outfitted.Users;

import org.springframework.stereotype.Component;

@Component
public class User {
    private static String name;
    private static String uid;
    private static String email;

    public User() {
        this.name ="";
        this.uid = "";
        this.email = "";
    }
    public User(String name, String uid, String email) {
        this.name = name;
        this.uid = uid;
        this.email = email;
    }

    public String getName() {

        return this.name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getUid() {

        return this.uid;
    }

    public void setUid(String uid) {

        this.uid = uid;
    }

    public String getEmail() {

        return this.email;
    }

    public void setEmail(String email) {

        this.email = email;
    }

    @Override
    public String toString(){
        String userString = "name: " + this.name + " uid: " + this.uid + " email: " + this.email;
        return userString;
    }
}

