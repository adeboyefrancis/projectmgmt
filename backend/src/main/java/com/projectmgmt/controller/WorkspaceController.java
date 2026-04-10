package com.projectmgmt.controller;

import com.projectmgmt.model.Workspace;
import com.projectmgmt.service.WorkspaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workspaces")
@RequiredArgsConstructor
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    // GET /api/workspaces → feeds setWorkspaces in Redux on app load
    @GetMapping
    public List<Workspace> getAll() {
        return workspaceService.findAll();
    }

    // GET /api/workspaces/:id → used by workspace switcher
    @GetMapping("/{id}")
    public Workspace getById(@PathVariable String id) {
        return workspaceService.findById(id);
    }

    // POST /api/workspaces → addWorkspace Redux action
    @PostMapping
    public Workspace create(@RequestBody Workspace workspace) {
        return workspaceService.create(workspace);
    }

    // PUT /api/workspaces/:id → updateWorkspace Redux action
    @PutMapping("/{id}")
    public Workspace update(@PathVariable String id,
                            @RequestBody Workspace workspace) {
        return workspaceService.update(id, workspace);
    }

    // DELETE /api/workspaces/:id → deleteWorkspace Redux action
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        workspaceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
