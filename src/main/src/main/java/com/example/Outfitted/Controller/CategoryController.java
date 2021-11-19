package com.example.Outfitted.Controller;
import com.example.Outfitted.Objects.Category;
import com.example.Outfitted.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/getCategoryDetails")
    public Category getCategory(@RequestParam String name, @RequestParam("uid") String uid) throws InterruptedException, ExecutionException {
        return categoryService.getCategoryDetails(name, uid);
    }

    @PostMapping("/createCategory")
    public String createCategory(@RequestBody Category category, @RequestParam("uid") String uid) throws InterruptedException, ExecutionException {
        return categoryService.saveCategoryDetails(category, uid);
    }

    @PutMapping("/updateCategory")
    public String updateCategory(@RequestBody Category category, @RequestParam("uid") String uid) throws InterruptedException, ExecutionException {
        return categoryService.updateCategoryDetails(category, uid);
    }

    @DeleteMapping("/deleteCategory ")
    public String deleteCategory(@RequestParam String name, @RequestParam("uid") String uid) throws InterruptedException, ExecutionException {
        return categoryService.deleteCategory(name, uid);
    }

}
