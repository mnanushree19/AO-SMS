import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {

    return (

        <div>

            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="content">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default DashboardLayout;