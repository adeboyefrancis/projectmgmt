package com.projectmgmt.service;

import com.projectmgmt.model.Workspace;
import com.projectmgmt.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;

    public List<Workspace> findAll() {
        return workspaceRepository.findAll();
    }

    public Workspace findById(String id) {
        return workspaceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workspace not found: " + id));
    }

    public Workspace create(Workspace workspace) {
        if (workspace.getId() == null || workspace.getId().isBlank()) {
            workspace.setId(UUID.randomUUID().toString());
        }
        if (workspace.getSlug() == null || workspace.getSlug().isBlank()) {
            workspace.setSlug(workspace.getName().toLowerCase().replace(" ", "-"));
        }
        return workspaceRepository.save(workspace);
    }

    public Workspace update(String id, Workspace updated) {
        Workspace existing = findById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        if (updated.getImage_url() != null) existing.setImage_url(updated.getImage_url());
        return workspaceRepository.save(existing);
    }

    public void delete(String id) {
        workspaceRepository.deleteById(id);
    }
}
