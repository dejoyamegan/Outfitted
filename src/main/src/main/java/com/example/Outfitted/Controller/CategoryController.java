package com.example.Outfitted.Controller;
import com.example.Outfitted.Objects.Category;
import com.example.Outfitted.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
//@DemoController
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/getUserDetails")
    public Category getCategory(@RequestParam String name) throws InterruptedException, ExecutionException {
        return categoryService.getCategoryDetails(name);
    }

    @PostMapping("/createUser")
    public String createCategory(@RequestBody Category category) throws InterruptedException, ExecutionException {
        return categoryService.saveCategoryDetails(category);
    }

    @PutMapping("/updateUser")
    public String updateCategory(@RequestBody Category category) throws InterruptedException, ExecutionException {
        return categoryService.updateCategoryDetails(category);
    }

    @DeleteMapping("/deleteUser")
    public String deleteCategory(@RequestParam String name) throws InterruptedException, ExecutionException {
        return categoryService.deleteCategory(name);
    }

}
