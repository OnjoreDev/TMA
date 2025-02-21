package net.wilson.tma_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.wilson.tma_backend.entity.Status;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

//used to transfer data between client and server
public class TaskDto {
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private Status status;
}
