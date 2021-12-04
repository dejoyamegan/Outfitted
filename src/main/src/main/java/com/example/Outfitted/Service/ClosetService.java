package com.example.Outfitted.Service;

import com.example.Outfitted.Objects.Closet;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firestore.v1.Write;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class ClosetService {

//    public static final String COL_NAME="closet";
    //Testing collection path
    public static String COL_NAME = null;



    private CollectionReference getClosetCollection() {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COL_NAME);
    }
    private void getPath(String email) {
        COL_NAME = "users/" + email + "/closet";
        System.out.println("FIRESTORE PATH: " + COL_NAME);
    }

    public String saveClosetDetails(Closet closet, String email) throws InterruptedException, ExecutionException {
        getPath(email);
        ApiFuture<WriteResult> collectionsApiFuture =
                getClosetCollection().document(closet.getOwner()).set(closet);
        return collectionsApiFuture.get().getUpdateTime().toString();
//        return "Added";
    }


    public Closet getClosetDetails(String closet, String email) throws InterruptedException, ExecutionException {
        getPath(email);

        DocumentReference documentReference = getClosetCollection().document(String.valueOf(closet));
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        Closet closet1 = null;

        if(document.exists()) {
            closet1 = document.toObject(Closet.class);
            return closet1;
        }
        else {
            return null;
        }
    }

    public String updateClosetDetails(Closet closet, String email) throws InterruptedException, ExecutionException {
        getPath(email);

        ApiFuture<WriteResult> collectionsApiFuture = getClosetCollection()
                .document(closet.getOwner()).set(closet);

        return collectionsApiFuture.get().getUpdateTime().toString();
        //return "Updated";
    }

    public String deleteCloset(String email, String name) {
        getPath(email);

        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COL_NAME).document(name).delete();

        return "Closet "+name+ " for "+email+" has been deleted";
    }
}

