package dev.treppmann.simplenote.notes;

import java.util.List;

public interface INoteService {
    List<NoteDTO> getNotes(String userId);
    NoteDTO createNote(String userId);
}
