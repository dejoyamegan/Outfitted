package com.example.Outfitted.Controller;
import com.example.Outfitted.Objects.Outfit;
import com.example.Outfitted.Service.OutfitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
public class OutfitController {

    @Autowired
    OutfitService outfitService;

    @GetMapping("/getOutfitDetails")
    public Outfit getOutfit(@RequestParam String name, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return outfitService.getOutfitDetails(name, email);
    }

    @PostMapping("/createOutfit")
    public String createOutfit(@RequestBody Outfit outfit, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return outfitService.saveOutfitDetails(outfit, email);
    }

    @PutMapping("/updateOutfit")
    public String updateOutfit(@RequestBody Outfit outfit, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return outfitService.updateOutfitDetails(outfit, email);
    }

    @DeleteMapping("/deleteOutfit")
    public String deleteOutfit(@RequestParam String name, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return outfitService.deleteOutfit(name, email);
    }

}
