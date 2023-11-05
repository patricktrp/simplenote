package dev.treppmann.simplenote.notes;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class NoteService implements INoteService {
    private final NoteRepository noteRepository;
    private final OkHttpClient client = new OkHttpClient();

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

    @Override
    public void updateNote(String userId, String noteId, NoteUpdateRequest noteUpdateRequest) {
        Note note = noteRepository.findById(noteId).get();
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

    @Override
    public void deleteNoteById(String userId, String noteId) {
        Note note = noteRepository.findById(noteId).get();
        if (note.getUserId().equals(userId)) {
            noteRepository.delete(note);
        }
    }

    @Override
    public String askAiAssistant(String user, String query) {
        HttpUrl.Builder urlBuilder = HttpUrl.parse("http://ai_service:5000").newBuilder();
        urlBuilder.addQueryParameter("query", query);
        urlBuilder.addQueryParameter("user", user);
        String url = urlBuilder.build().toString();

        Request request = new Request.Builder()
                .url(url)
                .get()
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected response: " + response);
            }
            return response.body().string();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    private NoteDTO mapNoteToDTO(Note note) {
        String content = note.getRawContent();
        String contentPreview = content.split("\n")[0];
        return new NoteDTO(note.getId(), note.getEditorContent(), note.getCreatedAt(), note.getCreatedAt(), contentPreview);
    }
}
