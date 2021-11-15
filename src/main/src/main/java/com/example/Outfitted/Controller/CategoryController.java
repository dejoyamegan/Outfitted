package com.example.Outfitted.Controller;
import com.example.Outfitted.Objects.Category;
import com.example.Outfitted.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
public class CategoryController {

//    @Autowired
    CategoryService categoryService;

    @GetMapping("/getCategoryDetails")
    public Category getCategory(@RequestParam String name) throws InterruptedException, ExecutionException {
        return categoryService.getCategoryDetails(name);
    }

    @PostMapping("/createCategory")
    public String createCategory(@RequestBody Category category) throws InterruptedException, ExecutionException {
        return categoryService.saveCategoryDetails(category);
    }

    @PutMapping("/updateCategory")
    public String updateCategory(@RequestBody Category category) throws InterruptedException, ExecutionException {
        return categoryService.updateCategoryDetails(category);
    }

    @DeleteMapping("/deleteCategory ")
    public String deleteCategory(@RequestParam String name) throws InterruptedException, ExecutionException {
        return categoryService.deleteCategory(name);
    }

}
