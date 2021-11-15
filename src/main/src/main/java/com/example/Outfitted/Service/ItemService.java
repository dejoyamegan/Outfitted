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

    public static final String COL_NAME="items";

//    @Autowired
    private Firestore firestore;

    private CollectionReference getItemCollection() {
        return firestore.collection(COL_NAME);
    }

    public String saveItemDetails(Item item) throws InterruptedException, ExecutionException {
        ApiFuture<WriteResult> collectionsApiFuture =
                getItemCollection().document(item.getName().toString()).set(item);
//        return collectionsApiFuture.get().getUpdateTime().toString();
        return "Added";
    }


    public Item getItemDetails(Item item) throws InterruptedException, ExecutionException {

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

    public String updateItemDetails(Item item) throws InterruptedException, ExecutionException {

        ApiFuture<WriteResult> collectionsApiFuture = getItemCollection()
                .document(item.getName()).set(item);
        return collectionsApiFuture.get().getUpdateTime().toString();
        //return "Updated";
    }

    public String deleteItem(Item item) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COL_NAME).document(String.valueOf(item)).delete();

        return "Document with User ID "+item+" has been deleted";
    }
}
