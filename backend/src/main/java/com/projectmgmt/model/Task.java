package com.projectmgmt.model;

import com.projectmgmt.model.enums.Priority;
import com.projectmgmt.model.enums.TaskStatus;
import com.projectmgmt.model.enums.TaskType;
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
@Table(name = "tasks")
public class Task {

    @Id
    private String id;

    @Column(name = "project_id")
    private String projectId;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @Enumerated(EnumType.STRING)
    private TaskType type;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Column(name = "assignee_id")
    private String assigneeId;

    private Instant due_date;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    // Eagerly load assignee so frontend gets user details inline
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "assignee_id", insertable = false, updatable = false)
    private User assignee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", insertable = false, updatable = false)
    @JsonIgnoreProperties({"tasks", "members"})
    private Project project;

    // Empty list for comments — matches frontend shape (comments: [])
    @Transient
    private List<Object> comments = new ArrayList<>();
}
