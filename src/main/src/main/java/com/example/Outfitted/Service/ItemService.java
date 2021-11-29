package com.example.Outfitted.Service;
import com.example.Outfitted.Objects.Item;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firestore.v1.Write;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class ItemService {

//    public static final String COL_NAME="items";
   // public static final String USER="I2 Will";
    public static String COL_NAME= null;


    private CollectionReference getItemCollection() {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COL_NAME);
    }

    private void getPath(String uid) {
        COL_NAME = "users/" + uid + "/closet/" +uid+ "/items";
        System.out.println("FIRESTORE PATH: " + COL_NAME);
    }

    public String saveItemDetails(Item item, String email) throws InterruptedException, ExecutionException {
        getPath(email);
        ApiFuture<WriteResult> collectionsApiFuture =
                getItemCollection().document(item.getName()).set(item);
//        return collectionsApiFuture.get().getUpdateTime().toString();
        return "Added";
    }


    public Item getItemDetails(String item, String email) throws InterruptedException, ExecutionException {
        getPath(email);
        DocumentReference documentReference = getItemCollection().document(String.valueOf(item));
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        Item item1 = null;

        if(document.exists()) {
            item1 = document.toObject(Item.class);
            return item1;
        }
        else {
            return null;
        }
    }

    public String updateItemDetails(Item item, String email) throws InterruptedException, ExecutionException {
        getPath(email);
        ApiFuture<WriteResult> collectionsApiFuture = getItemCollection()
                .document(item.getName()).set(item);
        return collectionsApiFuture.get().getUpdateTime().toString();
        //return "Updated";
    }

    public String deleteItem(String item, String email) {
        getPath(email);
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COL_NAME).document(String.valueOf(item)).delete();

        return "Document with User ID "+item+" has been deleted";
    }
}
