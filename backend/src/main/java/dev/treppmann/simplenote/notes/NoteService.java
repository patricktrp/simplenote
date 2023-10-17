package dev.treppmann.simplenote.notes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService implements INoteService {
    private final NoteRepository noteRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Override
    public List<NoteDTO> getNotes(String userId) {
        List<Note> notes = noteRepository.findByUserId(userId, Sort.by(Sort.Direction.DESC, "updatedAt"));
        return notes.stream().map(this::mapNoteToDTO).collect(Collectors.toList());
    }

    @Override
    public NoteDTO createNote(String userId) {
        Note note = new Note(userId);
        return mapNoteToDTO(noteRepository.insert(note));
    }

    private NoteDTO mapNoteToDTO(Note note) {
        return new NoteDTO(note.getId(), note.getEditorContent(), note.getCreatedAt(), note.getCreatedAt());
    }
}
