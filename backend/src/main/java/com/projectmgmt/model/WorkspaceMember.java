package com.projectmgmt.model;

import com.projectmgmt.model.enums.WorkspaceRole;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "workspace_members",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "workspace_id"}))
public class WorkspaceMember {

    @Id
    private String id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "workspace_id")
    private String workspaceId;

    private String message;

    @Enumerated(EnumType.STRING)
    private WorkspaceRole role;

    // Eagerly load user so the frontend gets name/email/image inline
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", insertable = false, updatable = false)
    @JsonIgnoreProperties({"members", "projects"})
    private Workspace workspace;
}
