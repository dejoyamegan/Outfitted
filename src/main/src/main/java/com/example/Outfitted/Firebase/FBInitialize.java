package com.example.Outfitted.Firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
//@service and @postconstruct are annotations from spring boot

@Service
public class FBInitialize {

    public static Firestore firestore;
    @PostConstruct
    public void initialize() throws IOException {
        try{
            FileInputStream serviceAccount =
                    new FileInputStream("./service-key.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    //databseURL from firebase config
                    .setDatabaseUrl("https://outfitted-database-default-rtdb.firebaseio.com")
                    .build();

            FirebaseApp.initializeApp(options);
//            System.out.println("Firebase Initialized!");

//            firestore = FirestoreClient.getFirestore();
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}
