package com.example.Outfitted.Controller;
import com.example.Outfitted.Objects.Closet;
import com.example.Outfitted.Service.ClosetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
//@DemoController
public class ClosetController {

    @Autowired
    ClosetService closetService;

    @GetMapping("/getClosetDetails")
    public Closet getCloset(@RequestParam String closet, @RequestParam String email) throws InterruptedException, ExecutionException {
        return closetService.getClosetDetails(closet, email);
    }

    @PostMapping("/createCloset")
    public String createCloset(@RequestBody Closet closet, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return closetService.saveClosetDetails(closet, email);
    }

    @PutMapping("/updateCloset")
    public String updateCloset(@RequestBody Closet closet, @RequestParam String email) throws InterruptedException, ExecutionException {
        return closetService.updateClosetDetails(closet, email);
    }

    @DeleteMapping("/deleteCloset")
    public String deleteCloset(@RequestParam String email, @RequestParam String name) throws InterruptedException, ExecutionException {
        return closetService.deleteCloset(email, name);
    }

}

