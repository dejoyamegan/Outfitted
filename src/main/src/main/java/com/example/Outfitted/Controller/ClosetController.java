package com.example.Outfitted.Controller;
import com.example.Outfitted.Objects.Closet;
import com.example.Outfitted.Service.ClosetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
//@DemoController
public class ClosetController {

    @Autowired
    ClosetService closetService;

    @GetMapping("/getClosetDetails")
    public Closet getCloset(@RequestParam String closet, @PathVariable String email) throws InterruptedException, ExecutionException {
        return closetService.getClosetDetails(closet, email);
    }

    @PostMapping("/createCloset")
    public String createCloset(@RequestBody Closet closet, @RequestParam("uid") String uid) throws InterruptedException, ExecutionException {
        return closetService.saveClosetDetails(closet, uid);
    }

    @PutMapping("/updateCloset")
    public String updateCloset(@RequestBody Closet closet, @PathVariable String email) throws InterruptedException, ExecutionException {
        return closetService.updateClosetDetails(closet, email);
    }

    @DeleteMapping("/deleteCloset")
    public String deleteCloset(@PathVariable String email) throws InterruptedException, ExecutionException {
        return closetService.deleteCloset(email);
    }

}

