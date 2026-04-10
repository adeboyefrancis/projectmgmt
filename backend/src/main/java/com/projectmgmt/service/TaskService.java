package com.projectmgmt.service;

import com.projectmgmt.model.Task;
import com.projectmgmt.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<Task> findByProjectId(String projectId) {
        return taskRepository.findAll().stream()
                .filter(t -> projectId.equals(t.getProjectId()))
                .toList();
    }

    public Task findById(String id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found: " + id));
    }

    public Task create(String projectId, Task task) {
        task.setId(UUID.randomUUID().toString());
        task.setProjectId(projectId);
        return taskRepository.save(task);
    }

    public Task update(String id, Task updated) {
        Task existing = findById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setStatus(updated.getStatus());
        existing.setType(updated.getType());
        existing.setPriority(updated.getPriority());
        existing.setAssigneeId(updated.getAssigneeId());
        existing.setDue_date(updated.getDue_date());
        return taskRepository.save(existing);
    }

    public void delete(String id) {
        taskRepository.deleteById(id);
    }
}
