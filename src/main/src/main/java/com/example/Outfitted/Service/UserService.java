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

    public static User currentUser = new User();

    private CollectionReference getUserCollection() {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COL_NAME);
    }

    public String saveUserDetails(User user) throws InterruptedException, ExecutionException {
        ApiFuture<WriteResult> collectionsApiFuture =
                getUserCollection().document(user.getUid().toString()).set(user);


//        return collectionsApiFuture.get().getUpdateTime().toString();
            return "Added";
    }


    public User getUserDetails(String uid) throws InterruptedException, ExecutionException {
        DocumentReference documentReference = getUserCollection().document(uid);
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        User user;

        if(document.exists()) {
            user = document.toObject(User.class);
            currentUser = user;
            System.out.println(user.toString());
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

    public String deleteUser(String uid) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COL_NAME).document(uid).delete();

        return "Document with User ID "+uid+" has been deleted";
    }
}
