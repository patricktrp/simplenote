package dev.treppmann.simplenote.notes;

import java.util.Map;

public record NoteUpdateRequest(String editorContent, String rawContent) {
}
