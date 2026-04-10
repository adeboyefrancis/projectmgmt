package com.projectmgmt.service;

import com.projectmgmt.model.Project;
import com.projectmgmt.model.ProjectMember;
import com.projectmgmt.repository.ProjectMemberRepository;
import com.projectmgmt.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;

    public Project findById(String id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));
    }

    public Project create(String workspaceId, Project project) {
        project.setId(UUID.randomUUID().toString());
        project.setWorkspaceId(workspaceId);

        Project saved = projectRepository.save(project);

        // Auto-add team lead as first project member
        if (project.getTeam_lead() != null && !project.getTeam_lead().isBlank()) {
            ProjectMember lead = new ProjectMember();
            lead.setId(UUID.randomUUID().toString());
            lead.setUserId(project.getTeam_lead());
            lead.setProjectId(saved.getId());
            projectMemberRepository.save(lead);
        }

        return projectRepository.findById(saved.getId()).orElse(saved);
    }

    public Project update(String id, Project updated) {
        Project existing = findById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setStatus(updated.getStatus());
        existing.setPriority(updated.getPriority());
        existing.setProgress(updated.getProgress());
        existing.setStart_date(updated.getStart_date());
        existing.setEnd_date(updated.getEnd_date());
        existing.setTeam_lead(updated.getTeam_lead());
        return projectRepository.save(existing);
    }

    public void delete(String id) {
        projectRepository.deleteById(id);
    }

    public ProjectMember addMember(String projectId, String userId) {
        ProjectMember member = new ProjectMember();
        member.setId(UUID.randomUUID().toString());
        member.setProjectId(projectId);
        member.setUserId(userId);
        return projectMemberRepository.save(member);
    }
}
