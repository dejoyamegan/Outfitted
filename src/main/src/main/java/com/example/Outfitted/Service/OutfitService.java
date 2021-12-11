package com.example.Outfitted.Service;
import com.example.Outfitted.Objects.Item;
import com.example.Outfitted.Objects.Outfit;
import com.google.api.core.ApiFuture;
import com.google.api.core.ApiService;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.stereotype.Service;

import javax.annotation.Nullable;
import java.util.concurrent.ExecutionException;

@Service
public class OutfitService {

    public static String COL_NAME= null;

    private void getPath(String email) {
        COL_NAME = "users/" + email + "/closet/" + email + "/outfit";
        System.out.println("FIRESTORE PATH: " + COL_NAME);
    }

    private void getItemPath(String uid) {
        COL_NAME = "users/" + uid + "/closet/" +uid+ "/items";
        System.out.println("FIRESTORE PATH: " + COL_NAME);
    }

    private CollectionReference getOutfitCollection() {
        Firestore db = FirestoreClient.getFirestore();
        System.out.println("Current Path: " + COL_NAME);
        return db.collection(COL_NAME);
    }
    public String saveOutfitDetails(Outfit outfit, String email) throws InterruptedException, ExecutionException {
        getItemPath(email);

        var topRef = getOutfitCollection().document(outfit.getTop().getName()).get().get().toObject(Item.class);
        var bottomRef = getOutfitCollection().document(outfit.getBottom().getName()).get().get().toObject(Item.class);
        var topLayerRef = getOutfitCollection().document(outfit.getTopLayer().getName()).get().get().toObject(Item.class);
        var shoesRef = getOutfitCollection().document(outfit.getShoes().getName()).get().get().toObject(Item.class);
        var accessoryRef = getOutfitCollection().document(outfit.getAccessory().getName()).get().get().toObject(Item.class);

        getPath(email);
        outfit.setTop(topRef);
        outfit.setBottom(bottomRef);
        outfit.setTopLayer(topLayerRef);
        outfit.setShoes(shoesRef);
        outfit.setAccessory(accessoryRef);

        ApiFuture<WriteResult> collectionsApiFuture =
                getOutfitCollection().document(outfit.getName()).set(outfit);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Outfit getOutfitDetails(String name, String email) throws InterruptedException, ExecutionException {
        getPath(email);

        DocumentReference documentReference = getOutfitCollection().document(name);
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        Outfit outfit = null;

        getItemPath(email);

        if(document.exists()) {
            outfit = document.toObject(Outfit.class);
            return outfit;
        }
        else {
            return null;
        }
    }

    public String updateOutfitDetails(Outfit outfit, String email) throws InterruptedException, ExecutionException {
        getPath(email);

        ApiFuture<WriteResult> collectionsApiFuture = getOutfitCollection()
                .document(outfit.getName()).set(outfit);
        return collectionsApiFuture.get().getUpdateTime().toString();
        //return "Updated";
    }

    public String deleteOutfit(String name, String email) {
        getPath(email);

        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = getOutfitCollection().document(name).delete();

        return "Document with User ID "+name+" has been deleted";
    }
}
