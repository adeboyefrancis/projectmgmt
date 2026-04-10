package com.projectmgmt.controller;

import com.projectmgmt.model.Project;
import com.projectmgmt.model.ProjectMember;
import com.projectmgmt.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/workspaces")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    // POST /api/workspaces/:workspaceId/projects → addProject Redux action
    // Called by CreateProjectDialog handleSubmit
    @PostMapping("/{workspaceId}/projects")
    public Project createProject(@PathVariable String workspaceId,
                                 @RequestBody Project project) {
        return projectService.create(workspaceId, project);
    }

    // PUT /api/workspaces/projects/:id → updateWorkspace Redux action
    // Called by ProjectSettings handleSubmit
    @PutMapping("/projects/{id}")
    public Project updateProject(@PathVariable String id,
                                 @RequestBody Project project) {
        return projectService.update(id, project);
    }

    // DELETE /api/workspaces/projects/:id
    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable String id) {
        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // POST /api/workspaces/projects/:projectId/members → AddProjectMember
    @PostMapping("/projects/{projectId}/members")
    public ProjectMember addMember(@PathVariable String projectId,
                                   @RequestBody Map<String, String> body) {
        return projectService.addMember(projectId, body.get("userId"));
    }
}
