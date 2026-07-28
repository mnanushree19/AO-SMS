import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Students() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);


    useEffect(() => {
        loadStudents();
    }, [page, search]);


    const loadStudents = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                `/students/?page=${page}&search=${search}`
            );

            console.log("API RESPONSE:", response.data);

            const data = response.data;


            setStudents(
                data.results ? data.results : data
            );


            setNext(
                data.next ? data.next : null
            );


            setPrevious(
                data.previous ? data.previous : null
            );


        } catch(error) {

            console.log("API ERROR:", error);

        } finally {

            setLoading(false);

        }

    };



    const deleteStudent = async (id) => {

        if(!window.confirm("Delete Student?"))
            return;


        try {

            await api.delete(
                `/students/${id}/`
            );

            loadStudents();


        } catch(error) {

            alert("Delete Failed");

        }

    };



    if(loading){

        return <h3>Loading Students...</h3>;

    }



    return (

        <div className="container mt-4">


            <div className="d-flex justify-content-between mb-3">

                <h2>Students</h2>


                <Link
                    to="/students/add"
                    className="btn btn-primary"
                >
                    Add Student
                </Link>


            </div>



            <input

                type="text"

                className="form-control mb-3"

                placeholder="Search Student..."

                value={search}

                onChange={(e)=>{

                    setSearch(e.target.value);
                    setPage(1);

                }}

            />



            <table className="table table-bordered table-hover">


                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>CGPA</th>
                        <th>Role</th>
                        <th>Actions</th>

                    </tr>

                </thead>



                <tbody>


                {
                    students.length === 0 ?

                    (
                        <tr>

                            <td colSpan="7" className="text-center">

                                No Students Found

                            </td>

                        </tr>
                    )


                    :

                    students.map((student)=>(


                        <tr key={student.id}>


                            <td>
                                {student.id}
                            </td>



                            <td>

                                {student.user?.name || "N/A"}

                            </td>



                            <td>

                                {student.user?.email || "N/A"}

                            </td>



                            <td>

                                {student.department?.name || "N/A"}

                            </td>



                            <td>

                                {student.cgpa}

                            </td>



                            <td>

                                {student.user?.role || "N/A"}

                            </td>



                            <td>


                                <Link

                                    to={`/students/${student.id}`}

                                    className="btn btn-success btn-sm me-2"

                                >

                                    View

                                </Link>



                                <Link

                                    to={`/students/edit/${student.id}`}

                                    className="btn btn-warning btn-sm me-2"

                                >

                                    Edit

                                </Link>



                                <button

                                    className="btn btn-danger btn-sm"

                                    onClick={() => deleteStudent(student.id)}

                                >

                                    Delete

                                </button>


                            </td>


                        </tr>


                    ))

                }


                </tbody>


            </table>



            <div className="d-flex justify-content-between">


                <button

                    className="btn btn-secondary"

                    disabled={!previous}

                    onClick={() => setPage(page - 1)}

                >

                    Previous

                </button>



                <h5>
                    Page {page}
                </h5>



                <button

                    className="btn btn-secondary"

                    disabled={!next}

                    onClick={() => setPage(page + 1)}

                >

                    Next

                </button>


            </div>


        </div>

    );

}


export default Students;