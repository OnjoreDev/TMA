package net.wilson.tma_backend.repository;

import net.wilson.tma_backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
