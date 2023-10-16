package dev.treppmann.simplenote;

import dev.treppmann.simplenote.notes.Note;
import dev.treppmann.simplenote.notes.NoteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SimplenoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimplenoteApplication.class, args);
	}

	@Bean
	CommandLineRunner runner (NoteRepository repository) {
		return args -> {
			Note note = new Note("user1", "This is a note", "This is a note");
			repository.insert(note);
		};
	}
}
