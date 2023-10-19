package dev.treppmann.simplenote.notes;

import java.time.LocalDateTime;
import java.util.Map;

public record NoteDTO(
        String noteId,
        Map<String, Object> content,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String contentPreview
) {
}
