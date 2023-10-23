package dev.treppmann.simplenote.notes;

import java.util.List;
import java.util.Map;

public interface INoteService {
    List<NoteDTO> getNotes(String userId);
    NoteDTO createNote(String userId);
    void updateNote(String userId, String noteId, NoteUpdateRequest noteUpdateRequest);
    NoteDTO getNoteById(String userId, String noteId);

    void deleteNoteById(String userId, String noteId);
}
