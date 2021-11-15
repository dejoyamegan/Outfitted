package com.example.Outfitted.Firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
//@service and @postconstruct are annotations from spring boot
@Service
public class FBInitialize {

    @PostConstruct
    public void initialize() {
        try{
            FileInputStream serviceAccount =
                    new FileInputStream("./service-key.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    //databseURL from firebase config
                    .setDatabaseUrl("https://outfitted-database-default-rtdb.firebaseio.com")
                    .build();

            FirebaseApp.initializeApp(options);
            System.out.println("Firebase Initialized!");
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}
