import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
    const { user } = useContext(AuthContext);

    return (
        <div className="sidebar p-3">
            <h4 className="text-white">Menu</h4>

            <NavLink to="/dashboard" className="nav-link">
                🏠 Dashboard
            </NavLink>

            <NavLink to="/students" className="nav-link">
                👨‍🎓 Students
            </NavLink>

            {/* Show only for Admin */}
            {user && user.role === "ADMIN" && (
                <>
                    <NavLink to="/departments" className="nav-link">
                        🏢 Departments
                    </NavLink>

                    <NavLink to="/courses" className="nav-link">
                        📚 Courses
                    </NavLink>
                </>
            )}

            <NavLink to="/profile" className="nav-link">
                👤 Profile
            </NavLink>
        </div>
    );
}

export default Sidebar;