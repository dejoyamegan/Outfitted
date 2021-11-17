package com.example.Outfitted.Service;
//import com.example.Outfitted.Firebase.FBConfig;
import com.example.Outfitted.Firebase.FBConfig;
import com.example.Outfitted.Firebase.FBInitialize;
import com.example.Outfitted.Users.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class UserService  extends FBInitialize {

    public static final String COL_NAME="users";

    private CollectionReference getUserCollection() {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COL_NAME);
    }

    public String saveUserDetails(User user) throws InterruptedException, ExecutionException {
        ApiFuture<WriteResult> collectionsApiFuture =
                getUserCollection().document(user.getName().toString()).set(user);

//        return collectionsApiFuture.get().getUpdateTime().toString();
            return "Added";
    }


    public User getUserDetails(String name) throws InterruptedException, ExecutionException {
        DocumentReference documentReference = getUserCollection().document(name);
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        new User("No user found", "1", "None");
        User user;

        if(document.exists()) {
            user = document.toObject(User.class);
            return user;
        }
        else {
            System.out.println("No user found");
            return null;
        }
    }

    public String updateUserDetails(User person) throws InterruptedException, ExecutionException {

        ApiFuture<WriteResult> collectionsApiFuture = getUserCollection()
                .document(person.getName()).set(person);
        return collectionsApiFuture.get().getUpdateTime().toString();
        //return "Updated";
    }

    public String deleteUser(String name) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COL_NAME).document(name).delete();

        return "Document with User ID "+name+" has been deleted";
    }
}
