package net.wilson.tma_backend.controller;

import lombok.AllArgsConstructor;
import net.wilson.tma_backend.dto.TaskDto;
import net.wilson.tma_backend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//create a constructor
@AllArgsConstructor
//this makes the class handle http requests
@RestController
//define base url for all apis
@RequestMapping("api/tasks")
public class TaskController {
   //inject dependencies
   private TaskService taskService;

   //Build Add task REST API
   @PostMapping
   public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto){
       TaskDto savedTask = taskService.createTask(taskDto);
       return new ResponseEntity<>(savedTask,HttpStatus.CREATED);
   }

   //Build Get Task by id
    @GetMapping("{id}")
   public ResponseEntity<TaskDto> getTaskById(@PathVariable("id") Long taskId){
      TaskDto taskdto = taskService.getTaskById(taskId);
      return ResponseEntity.ok(taskdto);
   }

   //Build Get All Tasks REST API
    //map api response to the http request
    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllTasks(){
      List<TaskDto> tasks = taskService.getAllTasks();
      return ResponseEntity.ok(tasks);
    }

    //Build Update Task RestApi
    @PutMapping("{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable("id") Long taskId,@RequestBody TaskDto updatedTask){
      TaskDto taskDto =  taskService.updateTask(taskId,updatedTask);
      return ResponseEntity.ok(taskDto);
    }

    //Build Delete Task REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTask(@PathVariable("id") Long taskId){
       taskService.deleteTask(taskId);
       return ResponseEntity.ok("Task deleted successfully!");
    }

    //Build API Route to mark task as completed
    @PatchMapping("/{id}/complete")
    public ResponseEntity<TaskDto> markTaskAsCompleted(@PathVariable Long id) {
        // Call the service method to mark the task as completed
        TaskDto updatedTask = taskService.markTaskAsCompleted(id);

        if (updatedTask != null) {
            // Return the updated task with status 200 (OK)
            return ResponseEntity.ok(updatedTask);
        } else {
            // Return 404 (Not Found) if the task does not exist
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);  // Or return a message or custom error object
        }
    }
}
