package com.projectmgmt.model;

import com.projectmgmt.model.enums.Priority;
import com.projectmgmt.model.enums.ProjectStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "projects")
public class Project {

    @Id
    private String id;

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    private ProjectStatus status;

    private Instant start_date;

    private Instant end_date;

    // team_lead stores a userId string (matches Prisma schema)
    private String team_lead;

    @Column(name = "workspace_id")
    private String workspaceId;

    private int progress;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", insertable = false, updatable = false)
    @JsonIgnoreProperties({"projects", "members"})
    private Workspace workspace;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Task> tasks = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ProjectMember> members = new ArrayList<>();
}
