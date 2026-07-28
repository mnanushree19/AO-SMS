import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";import api from "../api/axios";

function AddStudent() {

    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    const [form, setForm] = useState({

        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "STUDENT",
        dob: "",
        gender: "Male",
        cgpa: "",
        department: "",
        courses: [],
        photo: null,

    });

    useEffect(() => {

        loadDepartments();
        loadCourses();

    }, []);

    const loadDepartments = async () => {

        try {

            const response = await api.get("/departments/");

            setDepartments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const loadCourses = async () => {

        try {

            const response = await api.get("/courses/");

            setCourses(response.data);

        }

        catch (error) {

            console.log(error);

        }

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

        const values = Array.from(

            e.target.selectedOptions,

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

        setLoading(true);

        const formData = new FormData();

        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("first_name", form.first_name);
        formData.append("last_name", form.last_name);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("role", form.role);
        formData.append("dob", form.dob);
        formData.append("gender", form.gender);
        formData.append("cgpa", form.cgpa);
        formData.append("department", form.department);

        form.courses.forEach(course => {

            formData.append("courses", course);

        });

        if (form.photo) {

            formData.append("photo", form.photo);

        }

        await api.post(

            "/students/",

            formData,

            {

                headers: {

                    "Content-Type": "multipart/form-data",

                },

            }

        );

        alert("Student Created Successfully");

        navigate("/students");

    }

    catch (error) {

        console.log(error);

        if (error.response) {

            console.log(error.response.data);

            alert(JSON.stringify(error.response.data));

        }

        else {

            alert("Something went wrong.");

        }

    }

    finally {

        setLoading(false);

    }

};

    return (

        <div className="container">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>Add Student</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>Username</label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="username"

                                    value={form.username}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Password</label>

                                <input

                                    type="password"

                                    className="form-control"

                                    name="password"

                                    value={form.password}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>First Name</label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="first_name"

                                    value={form.first_name}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Last Name</label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="last_name"

                                    value={form.last_name}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Email</label>

                                <input

                                    type="email"

                                    className="form-control"

                                    name="email"

                                    value={form.email}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Phone</label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="phone"

                                    value={form.phone}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Date of Birth</label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="dob"

                                    value={form.dob}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>CGPA</label>

                                <input

                                    type="number"

                                    step="0.01"

                                    className="form-control"

                                    name="cgpa"

                                    value={form.cgpa}

                                    onChange={handleChange}

                                    required

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

                                <label>Role</label>

                                <select

                                    className="form-select"

                                    name="role"

                                    value={form.role}

                                    onChange={handleChange}

                                >

                                    <option value="STUDENT">Student</option>

                                    <option value="TEACHER">Teacher</option>

                                    <option value="ADMIN">Admin</option>

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Department</label>

                                <select

                                    className="form-select"

                                    name="department"

                                    value={form.department}

                                    onChange={handleChange}

                                    required

                                >

                                    <option value="">Select Department</option>

                                    {

                                        departments.map((dept) => (

                                            <option

                                                key={dept.id}

                                                value={dept.id}

                                            >

                                                {dept.name}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Courses</label>

                                <select

                                    multiple

                                    className="form-select"

                                    onChange={handleCourses}

                                >

                                    {

                                        courses.map((course) => (

                                            <option

                                                key={course.id}

                                                value={course.id}

                                            >

                                                {course.name}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            <div className="col-md-12 mb-3">

                                <label>Photo</label>

                                <input

                                    type="file"

                                    className="form-control"

                                    onChange={handlePhoto}

                                />

                            </div>

                        </div>

                        <button

    className="btn btn-success"

    disabled={loading}

>

    {

        loading

        ?

        "Saving..."

        :

        "Save Student"

    }

</button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddStudent;