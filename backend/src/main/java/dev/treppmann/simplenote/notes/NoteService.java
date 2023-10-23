package dev.treppmann.simplenote.notes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.CriteriaDefinition;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;
import org.w3c.dom.Text;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService implements INoteService {
    private final NoteRepository noteRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public NoteService(NoteRepository noteRepository, MongoTemplate mongoTemplate) {
        this.noteRepository = noteRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<NoteDTO> getNotes(String userId) {
        List<Note> notes = noteRepository.findByUserId(userId, Sort.by(Sort.Direction.DESC, "updatedAt"));
        return notes.stream().map(this::mapNoteToDTO).collect(Collectors.toList());
    }

    @Override
    public List<NoteDTO> findNotesBySearchQuery(String userId, String queryText) {
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(queryText);
        Query query = Query.query(criteria);
        query.addCriteria(Criteria.where("userId").is(userId));
        List<Note> notes = mongoTemplate.find(query, Note.class);
        return notes.stream().map(this::mapNoteToDTO).toList();
    }

    @Override
    public NoteDTO createNote(String userId) {
        Note note = new Note(userId);
        return mapNoteToDTO(noteRepository.insert(note));
    }

    @Override
    public void updateNote(String userId, String noteId, NoteUpdateRequest noteUpdateRequest) {
        Note note = noteRepository.findById(noteId).get();
        System.out.println(note);
        if (note.getUserId().equals(userId)) {
            note.setEditorContent(noteUpdateRequest.editorContent());
            note.setRawContent(noteUpdateRequest.rawContent());
            noteRepository.save(note);
        }
    }

    @Override
    public NoteDTO getNoteById(String userId, String noteId) {
        Note note = noteRepository.findById(noteId).get();
        System.out.println(note);
        // TODO notfound here
        if (note.getUserId().equals(userId)) {
            return mapNoteToDTO(note);
        }
        // TODO: throw unauthorized here
        return null;
    }

    private NoteDTO mapNoteToDTO(Note note) {
        String content = note.getRawContent();
        String contentPreview = content.split("\n")[0];
        return new NoteDTO(note.getId(), note.getEditorContent(), note.getCreatedAt(), note.getCreatedAt(), contentPreview);
    }
}
