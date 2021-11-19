package com.example.Outfitted.Service;
import com.example.Outfitted.Objects.Category;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class CategoryService {

    public static String COL_NAME= null;

    private void getPath(String uid) {
        COL_NAME = "users/" + uid + "/closet/" + uid + "/category";
        System.out.println("FIRESTORE PATH: " + COL_NAME);
    }

    private CollectionReference getCategoryCollection() {
        Firestore db = FirestoreClient.getFirestore();
        System.out.println("Current Path: " + COL_NAME);
        return db.collection(COL_NAME);
    }
    public String saveCategoryDetails(Category category, String uid) throws InterruptedException, ExecutionException {
        getPath(uid);
        ApiFuture<WriteResult> collectionsApiFuture =
                getCategoryCollection().document(category.getName().toString()).set(category);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Category getCategoryDetails(String name, String uid) throws InterruptedException, ExecutionException {
        getPath(uid);

        DocumentReference documentReference = getCategoryCollection().document(name);
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        Category category = null;

        if(document.exists()) {
            category = document.toObject(Category.class);
            return category;
        }
        else {
            return null;
        }
    }

    public String updateCategoryDetails(Category category, String uid) throws InterruptedException, ExecutionException {
        getPath(uid);

        ApiFuture<WriteResult> collectionsApiFuture = getCategoryCollection()
                .document(category.getName()).set(category);
        return collectionsApiFuture.get().getUpdateTime().toString();
        //return "Updated";
    }

    public String deleteCategory(String name, String uid) {
        getPath(uid);

        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = getCategoryCollection().document(name).delete();

        return "Document with User ID "+name+" has been deleted";
    }
}
