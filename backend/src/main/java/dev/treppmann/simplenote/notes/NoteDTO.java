package dev.treppmann.simplenote.notes;

import java.time.LocalDateTime;
import java.util.Map;

public record NoteDTO(
        String noteId,
        String content,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String contentPreview
) {
}
