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
@RequestMapping("/notes")
public class NoteController {
    private final INoteService noteService;

    @Autowired
    public NoteController(INoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<List<NoteDTO>> getNotes(Principal principal) {
        if (principal == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        String userId = principal.getName();
        return ResponseEntity.ok(noteService.getNotes(userId));
    }
    
    @GetMapping("/{noteId}")
    public NoteDTO getNoteById(Principal principal, @PathVariable String noteId){
        return noteService.getNoteById(principal.getName(), noteId);
    }

    @PostMapping
    public NoteDTO createNote(Principal principal) {
        return noteService.createNote(principal.getName());
    }

    @PutMapping("/{noteId}")
    public String updateNote(Principal principal, @PathVariable String noteId, @RequestBody NoteUpdateRequest noteUpdateRequest) {
        noteService.updateNote(principal.getName(), noteId, noteUpdateRequest);
        return "update note";
    }
}
