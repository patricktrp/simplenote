package dev.treppmann.simplenote.notes;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findByUserId(String userId, Sort sort);
    List<Note> findByUserId(String userId, TextCriteria textCriteria);
}
