package dev.treppmann.simplenote.notes;

import dev.treppmann.simplenote.notes.INoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
public class NoteController {
    private final INoteService noteService;

    @Autowired
    public NoteController(INoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/notes")
    public ResponseEntity<List<NoteDTO>> getNotes(Principal principal) {
        if (principal == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        String userId = principal.getName();
        return ResponseEntity.ok(noteService.getNotes(userId));
    }
    
    @GetMapping("/notes/{noteId}")
    public NoteDTO getNoteById(Principal principal, @PathVariable String noteId){
        return noteService.getNoteById(principal.getName(), noteId);
    }

    @PostMapping("/notes")
    public NoteDTO createNote(Principal principal) {
        return noteService.createNote(principal.getName());
    }

    @PutMapping("/notes/{noteId}")
    public String updateNoteById(Principal principal, @PathVariable String noteId, @RequestBody NoteUpdateRequest noteUpdateRequest) {
        noteService.updateNote(principal.getName(), noteId, noteUpdateRequest);
        return "update note";
    }

    @DeleteMapping("/notes/{noteId}")
    public void deleteNoteById(Principal principal, @PathVariable String noteId) {
        noteService.deleteNoteById(principal.getName(), noteId);
    }

    @GetMapping("/assistant")
    public String askAiAssistant(Principal principal, @RequestParam String query) {
        return noteService.askAiAssistant(principal.getName(), query);
    }
}
