package dev.treppmann.simplenote.notes;

import java.util.Map;

public record NoteUpdateRequest(Map<String, Object> editorContent, String rawContent) {
}
