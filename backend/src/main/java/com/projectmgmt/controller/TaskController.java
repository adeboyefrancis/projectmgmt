package com.projectmgmt.controller;

import com.projectmgmt.model.Task;
import com.projectmgmt.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workspaces/projects")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    // GET /api/workspaces/projects/:projectId/tasks
    @GetMapping("/{projectId}/tasks")
    public List<Task> getByProject(@PathVariable String projectId) {
        return taskService.findByProjectId(projectId);
    }

    // POST /api/workspaces/projects/:projectId/tasks → addTask Redux action
    // Called by CreateTaskDialog handleSubmit
    @PostMapping("/{projectId}/tasks")
    public Task createTask(@PathVariable String projectId,
                           @RequestBody Task task) {
        return taskService.create(projectId, task);
    }

    // PUT /api/workspaces/projects/tasks/:id → updateTask Redux action
    // Called by ProjectTasks drag/drop or status change
    @PutMapping("/tasks/{id}")
    public Task updateTask(@PathVariable String id,
                           @RequestBody Task task) {
        return taskService.update(id, task);
    }

    // DELETE /api/workspaces/projects/tasks/:id → deleteTask Redux action
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
