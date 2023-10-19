package dev.treppmann.simplenote.notes;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Document
@Data
@RequiredArgsConstructor
public class Note {
    @Id
    private String id;
    private String userId;
    private Map<String,Object> editorContent;
    private String rawContent = "";

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public Note(String userId,  Map<String,Object> editorContent, String rawContent) {
        this.userId = userId;
        this.editorContent = editorContent;
        this.rawContent = rawContent;
    }

    public Note(String userId) {
        this.userId = userId;
    }
}