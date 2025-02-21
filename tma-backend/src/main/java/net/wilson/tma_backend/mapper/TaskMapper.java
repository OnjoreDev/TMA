package net.wilson.tma_backend.mapper;

import net.wilson.tma_backend.dto.TaskDto;
import net.wilson.tma_backend.entity.Task;

public class TaskMapper {
   //map a task to taskdto
    public static TaskDto mapToTaskDto(Task task){
      return new TaskDto(
              task.getId(),
              task.getTitle(),
              task.getDescription(),
              task.getDueDate(),
              task.getStatus()
      );
   }
   //map taskdto to task
    public static Task mapToTask(TaskDto taskDto){
        return new Task(
                taskDto.getId(),
                taskDto.getTitle(),
                taskDto.getDescription(),
                taskDto.getDueDate(),
                taskDto.getStatus()
        );


    }
}
