package dev.treppmann.simplenote.notes;

import java.time.LocalDateTime;

public record NoteDTO(
        String content,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
