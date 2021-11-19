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
    public static final String COL_NAME= "users/I2 Will/closet";



    private CollectionReference getClosetCollection() {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COL_NAME);
    }
    public String saveClosetDetails(Closet closet) throws InterruptedException, ExecutionException {
        ApiFuture<WriteResult> collectionsApiFuture =
                getClosetCollection().document(closet.getOwner().toString()).set(closet);
        return collectionsApiFuture.get().getUpdateTime().toString();
//        return "Added";
    }


    public Closet getClosetDetails(Closet closet) throws InterruptedException, ExecutionException {

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

    public String updateClosetDetails(Closet closet) throws InterruptedException, ExecutionException {

        ApiFuture<WriteResult> collectionsApiFuture = getClosetCollection()
                .document(closet.getOwner()).set(closet);

        return collectionsApiFuture.get().getUpdateTime().toString();
        //return "Updated";
    }

    public String deleteCloset(String owner) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COL_NAME).document(owner).delete();

        return "Closet for "+owner+" has been deleted";
    }
}

