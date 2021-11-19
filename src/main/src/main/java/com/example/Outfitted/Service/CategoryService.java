package com.example.Outfitted.Service;
import com.example.Outfitted.Objects.Category;
import com.example.Outfitted.Users.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firestore.v1.Write;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class CategoryService {
    //TODO How do we get user info. A get call?
    public static final String PATH="users/Jason/category";
    public static final String COL_NAME="category";


    //Autowired only used when you have multiple constructors. Explicitly select which constructor is the bean.
//    @Autowired
//    private Firestore firestore;

    private CollectionReference getCategoryCollection() {
        Firestore db = FirestoreClient.getFirestore();
        System.out.println("Current Path: " + PATH);
        return db.collection(PATH);
    }
    public String saveCategoryDetails(Category category) throws InterruptedException, ExecutionException {
        ApiFuture<WriteResult> collectionsApiFuture =
                getCategoryCollection().document(category.getName().toString()).set(category);
        return collectionsApiFuture.get().getUpdateTime().toString();
//        return "Added";
    }


    public Category getCategoryDetails(String name) throws InterruptedException, ExecutionException {

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

    public String updateCategoryDetails(Category category) throws InterruptedException, ExecutionException {

        ApiFuture<WriteResult> collectionsApiFuture = getCategoryCollection()
                .document(category.getName()).set(category);
        return collectionsApiFuture.get().getUpdateTime().toString();
        //return "Updated";
    }

    public String deleteCategory(String name) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = getCategoryCollection().document(name).delete();

        return "Document with User ID "+name+" has been deleted";
    }
}
