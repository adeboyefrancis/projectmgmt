package com.projectmgmt.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "project_members",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "project_id"}))
public class ProjectMember {

    @Id
    private String id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "project_id")
    private String projectId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", insertable = false, updatable = false)
    @JsonIgnoreProperties({"tasks", "members"})
    private Project project;
}
