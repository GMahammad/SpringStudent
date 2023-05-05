package com.amigoscode.demo.student;

import com.amigoscode.demo.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentDataAccessService studentDataAccessService;
    private final EmailValidator emailValidator;
    @Autowired
    public StudentService(StudentDataAccessService studentDataAccessService, EmailValidator emailValidator) {
        this.studentDataAccessService = studentDataAccessService;
        this.emailValidator = emailValidator;
    }

     List<Student> getAllStudent(){
      return studentDataAccessService.selectAllStudents();
    }

    void addNewStudent(Student student){
        addNewStudent(null,student);
    }
     void addNewStudent(UUID studentId, Student student) {
         UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());
         studentDataAccessService.insertStudent(newStudentId,student);
        if(!emailValidator.test(student.getEmail())){
            throw new IllegalStateException("Email is invalid");
        }
        if(!studentDataAccessService.isEmailTaken(student.getEmail())){
            throw new IllegalStateException("Email is taken");
        }

    }

    public List<StudentCourse> getAllCoursesForStudent(UUID studentId) {
        return studentDataAccessService.selectAllStudentCourses(studentId);
    }
}
