package com.amigoscode.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class StudentDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<Student> selectAllStudents() {
        String sql = "" + "SELECT student_id, first_name, last_name, email, gender FROM student";
        return jdbcTemplate.query(sql, getStudentRowMapper());

    }



    public int insertStudent(UUID newStudentId, Student student) {
        String sql = "INSERT INTO student (" + " student_id, first_name, last_name, email, gender) " + " VALUES(?, ?, ?, ?, ?::gender)";
        return jdbcTemplate.update(sql, newStudentId, student.getFirstName(), student.getLastName(), student.getEmail(), student.getGender().name().toUpperCase());

    }

    @SuppressWarnings("ConstantConditions")
    public boolean isEmailTaken(String email) {
        String sql = "" + "SELECT EXISTS ( " + "SELECT 1 FROM student WHERE email = ? )";
        return jdbcTemplate.queryForObject(sql, new Object[]{email}, (resultSet, i) -> resultSet.getBoolean(1));
    }

     List<StudentCourse> selectAllStudentCourses(UUID studentId) {
        String sql = "" + "SELECT " + "student.student_id," +
                "course.course_id, " + "course.name, " + "course.description, "
                + "course.department, " + "course.teacher_name, " + "student_course.start_date, "
                + "student_course.end_date, " + "student_course.grade " + "FROM student " + "JOIN student_course USING (student_id) " + "JOIN course         USING (course_id) " + "WHERE student.student_id = ?";

        return jdbcTemplate.query(sql, new Object[]{studentId},mapStudentCourseFromDb());
    }
    private RowMapper<StudentCourse> mapStudentCourseFromDb(){
        return (resultSet, i)->
            new StudentCourse(
                    UUID.fromString(resultSet.getString("student_id")),
                    UUID.fromString(resultSet.getString("course_id")),
                    resultSet.getString("name"),
                    resultSet.getString("description"),
                    resultSet.getString("department"),
                    resultSet.getString("teacher_name"),
                    resultSet.getDate("start_date").toLocalDate(),
                    resultSet.getDate("end_date").toLocalDate(),
                    Optional.ofNullable(resultSet.getString("grade"))
                            .map(Integer::parseInt).orElse(null)
                    );

    }
    private static RowMapper<Student> getStudentRowMapper() {
        return (resultSet, i) -> {
            String studentIdStr = resultSet.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);
            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");
            String genderStr = resultSet.getString("gender").toUpperCase();
            Student.Gender gender = Student.Gender.valueOf(genderStr);
            return new Student(studentId, firstName, lastName, email, gender);
        };
    }

}
