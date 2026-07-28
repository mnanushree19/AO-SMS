import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import api from "../api/axios";

function EditStudent() {

    const { id } = useParams();
    const navigate=useNavigate();

    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);

    const [form, setForm] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "STUDENT",
        dob: "",
        gender: "",
        cgpa: "",
        department: "",
        courses: [],
        photo: null,
    });

    const [currentPhoto, setCurrentPhoto] = useState("");

    useEffect(() => {

        loadDepartments();
        loadCourses();
        loadStudent();

    }, []);

    const loadDepartments = async () => {
const res = await api.get("/departments/");
setDepartments(res.data.results);
    };

    const loadCourses = async () => {

       const res = await api.get("/courses/");
setCourses(res.data.results);

    };

    const loadStudent = async () => {

        const res = await api.get(`/students/${id}/`);

        const s = res.data;

        setCurrentPhoto(s.photo);

        setForm({

            username: s.user.username,
            first_name: s.user.first_name,
            last_name: s.user.last_name,
            email: s.user.email,
            phone: s.user.phone,
            role: s.user.role,
            dob: s.dob,
            gender: s.gender,
            cgpa: s.cgpa,
           department: s.department ? s.department.id : "",
courses: s.courses ? s.courses.map(c => c.id) : [],
            photo: null,

        });

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({

            ...form,

            [name]: value,

        });

    };

    const handlePhoto = (e) => {

        setForm({

            ...form,

            photo: e.target.files[0],

        });

    };

    const handleCourses = (e) => {

    const values = [...e.target.selectedOptions].map(
        option => option.value
    );

    setForm({
        ...form,
        courses: values,
    });

};

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const formData = new FormData();

        formData.append("username", form.username);
        formData.append("first_name", form.first_name);
        formData.append("last_name", form.last_name);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("role", form.role);
        formData.append("dob", form.dob);
        formData.append("gender", form.gender);
        formData.append("cgpa", form.cgpa);
        formData.append("department", form.department);

        form.courses.forEach((course) => {
            formData.append("courses", course);
        });

        if (form.photo) {
            formData.append("photo", form.photo);
        }

        await api.put(
            `/students/${id}/`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        alert("Student Updated Successfully");
        navigate("/students");

    } catch (err) {
    console.log(err);

    if (err.response) {
        console.log(err.response.data);
        alert(JSON.stringify(err.response.data));
    } else {
        alert("Update Failed");
    }
}
    

};
    return (

        <div className="container mt-4">

            <h2>Edit Student</h2>

            <form onSubmit={handleSubmit}>

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label>Username</label>
                        <input
                            className="form-control"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>First Name</label>
                        <input
                            className="form-control"
                            name="first_name"
                            value={form.first_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Last Name</label>
                        <input
                            className="form-control"
                            name="last_name"
                            value={form.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Email</label>
                        <input
                            className="form-control"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Phone</label>
                        <input
                            className="form-control"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Role</label>

                        <select
                            className="form-select"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                        >
                            <option value="ADMIN">Admin</option>
                            <option value="TEACHER">Teacher</option>
                            <option value="STUDENT">Student</option>
                        </select>

                    </div>

                    <div className="col-md-6 mb-3">
                        <label>DOB</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Gender</label>

                        <select
                            className="form-select"
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                    </div>

                    <div className="col-md-6 mb-3">
                        <label>CGPA</label>

                        <input
                            className="form-control"
                            name="cgpa"
                            value={form.cgpa}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Department</label>

                        <select
                            className="form-select"
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                        >

                            {departments.map(dep => (

                                <option
                                    key={dep.id}
                                    value={dep.id}
                                >

                                    {dep.name}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="col-md-12 mb-3">

                        <label>Courses</label>

                        <select
                            multiple
                            className="form-select"
                            value={form.courses}
                            onChange={handleCourses}
                        >

                            {courses.map(course => (

                                <option
                                    key={course.id}
                                    value={course.id}
                                >

                                    {course.name}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="col-md-12 mb-3">

                        <label>Current Photo</label>

                        <br />

                        {currentPhoto && (

                            <img
                                src={currentPhoto}
                                alt=""
                                width="150"
                                className="mb-3"
                            />

                        )}

                    </div>

                    <div className="col-md-12 mb-3">

                        <label>Replace Photo</label>

                        <input
                            type="file"
                            className="form-control"
                            onChange={handlePhoto}
                        />

                    </div>

                </div>
                <div className="mt-3">
    <button
        type="submit"
        className="btn btn-primary"
    >
        Update Student
    </button>
</div>

            </form>

        </div>

    );

}

export default EditStudent;