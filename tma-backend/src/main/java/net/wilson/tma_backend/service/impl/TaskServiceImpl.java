package net.wilson.tma_backend.service.impl;

import lombok.AllArgsConstructor;
import net.wilson.tma_backend.dto.TaskDto;
import net.wilson.tma_backend.entity.Status;
import net.wilson.tma_backend.entity.Task;
import net.wilson.tma_backend.mapper.TaskMapper;
import net.wilson.tma_backend.repository.TaskRepository;
import net.wilson.tma_backend.service.TaskService;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    //inject dependencies
    private TaskRepository taskRepository;

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        //convert task dto to task entity because we need to store task entity to db
        Task task = TaskMapper.mapToTask(taskDto);
        //save task entity to db
        Task savedTask = taskRepository.save(task);
        //convert saved employee entity to dto
        return TaskMapper.mapToTaskDto(savedTask);

    }

    @Override
    public TaskDto getTaskById(Long taskId) {
       Task task =  taskRepository.findById(taskId).orElseThrow(() -> new ResolutionException("Task with id "+taskId+" not found"));
        //convert task entity to taskdto
        return TaskMapper.mapToTaskDto(task);

    }

    @Override
    public List<TaskDto> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        //convert tasks to taskdto

        return tasks.stream().map((task)-> TaskMapper.mapToTaskDto(task)).collect(Collectors.toList());
    }

    @Override
    public TaskDto updateTask(Long taskId, TaskDto updatedTask) {
        Task task = taskRepository.findById(taskId).orElseThrow(()-> new ResolutionException("Task with id "+taskId+" not found."));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setDueDate(updatedTask.getDueDate());
        task.setStatus(updatedTask.getStatus());

        Task updatedtask = taskRepository.save(task);

        return TaskMapper.mapToTaskDto(updatedtask);
    }

    @Override
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(()-> new ResolutionException("Task with id "+taskId+" not found."));
        taskRepository.deleteById(taskId);
    }

    @Override
    public TaskDto markTaskAsCompleted(Long taskId) {
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if(taskOptional.isPresent()){
            Task task = taskOptional.get();
            // Set the task status to COMPLETED
            task.setStatus(Status.COMPLETED);
            taskRepository.save(task);  // Save the updated task in the database

            // Convert the Task entity to TaskDto and return it
            return TaskMapper.mapToTaskDto(task);
        }
        return null; //if task is not found
    }
}
