import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
    const [stats, setStats] = useState({
        students: 0,
        departments: 0,
        courses: 0,
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await api.get("/dashboard/");
            setStats(response.data);
        } catch (error) {
            console.error("Error loading dashboard:", error);
        }
    };

    return (
        <div>
            <h2 className="mb-4">Dashboard</h2>

            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h3>👨‍🎓</h3>
                            <h5>Students</h5>
                            <h2>{stats.students}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h3>🏢</h3>
                            <h5>Departments</h5>
                            <h2>{stats.departments}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h3>📚</h3>
                            <h5>Courses</h5>
                            <h2>{stats.courses}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;