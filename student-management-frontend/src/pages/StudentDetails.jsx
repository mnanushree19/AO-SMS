import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function StudentDetail() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [student, setStudent] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchStudent();

    }, []);

    const fetchStudent = async () => {

        try {

            const response = await api.get(`/students/${id}/`);

            setStudent(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Student not found");

        }

        finally {

            setLoading(false);

        }

    };

    const deleteStudent = async () => {

        if (!window.confirm("Delete this student?"))

            return;

        try {

            await api.delete(`/students/${id}/`);

            alert("Student Deleted Successfully");

            navigate("/students");

        }

        catch (error) {

            alert("Unable to Delete Student");

        }

    };

    if (loading)

        return <h3>Loading...</h3>;

    if (!student)

        return <h3>No Student Found</h3>;

    return (

        <div className="container">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>

                        Student Details

                    </h3>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-4 text-center">

                            {

                                student.photo ?

                                <img
                                    src={`http://127.0.0.1:8000${student.photo}`}
                                    alt="student"
                                    className="img-thumbnail"
                                    width="220"
                                />

                                :

                                <img
                                    src="https://via.placeholder.com/220"
                                    alt="student"
                                    className="img-thumbnail"
                                />

                            }

                        </div>

                        <div className="col-md-8">

                            <table className="table table-bordered">

                                <tbody>

                                    <tr>

                                        <th>ID</th>

                                        <td>{student.id}</td>

                                    </tr>

                                    <tr>

                                        <th>Name</th>

                                        <td>

                                            {student.user.first_name}{" "}

                                            {student.user.last_name}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>Username</th>

                                        <td>{student.user.username}</td>

                                    </tr>

                                    <tr>

                                        <th>Email</th>

                                        <td>{student.user.email}</td>

                                    </tr>

                                    <tr>

                                        <th>Phone</th>

                                        <td>{student.user.phone}</td>

                                    </tr>

                                    <tr>

                                        <th>Role</th>

                                        <td>{student.user.role}</td>

                                    </tr>

                                    <tr>

                                        <th>Date of Birth</th>

                                        <td>{student.dob}</td>

                                    </tr>

                                    <tr>

                                        <th>Gender</th>

                                        <td>{student.gender}</td>

                                    </tr>

                                    <tr>

                                        <th>CGPA</th>

                                        <td>{student.cgpa}</td>

                                    </tr>

                                    <tr>

                                        <th>Department</th>

                                        <td>

                                            {student.department.name}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>Courses</th>

                                        <td>

                                            {

                                                student.courses.map(course => (

                                                    <span
                                                        key={course.id}
                                                        className="badge bg-success me-2"
                                                    >

                                                        {course.name}

                                                    </span>

                                                ))

                                            }

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                <div className="card-footer">

                    <Link
                        to="/students"
                        className="btn btn-secondary me-2"
                    >

                        Back

                    </Link>

                    <Link
                        to={`/students/edit/${student.id}`}
                        className="btn btn-warning me-2"
                    >

                        Edit

                    </Link>

                    <button
                        className="btn btn-danger"
                        onClick={deleteStudent}
                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default StudentDetail;