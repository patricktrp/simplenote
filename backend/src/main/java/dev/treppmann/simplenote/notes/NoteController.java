package dev.treppmann.simplenote.notes;

import dev.treppmann.simplenote.notes.INoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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
    public List<NoteDTO> getNotes(Principal principal) {
        String userId = principal.getName();
        return noteService.getNotes(userId);
    }
    
    @GetMapping("/{noteId}")
    public String getNoteById(@PathVariable String noteId) {
        return noteId;
    }

    @PostMapping
    public NoteDTO createNote(Principal principal) {
        return noteService.createNote(principal.getName());
    }

    @PutMapping
    public String updateNote() {
        return "update note";
    }
}
