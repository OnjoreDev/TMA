package net.wilson.tma_backend.service;

import net.wilson.tma_backend.dto.TaskDto;

import java.util.List;

public interface TaskService {
    //function to create task
    TaskDto createTask(TaskDto taskDto);

    //function to get task by id
    TaskDto getTaskById(Long taskId);

    //function to get all tasks
    List<TaskDto> getAllTasks();

    //function to update task
    TaskDto updateTask(Long taskId, TaskDto updatedTask);

    //function to delete task
    void deleteTask(Long taskId);

    //new method to mark task as completed
    TaskDto markTaskAsCompleted(Long taskId);
}
