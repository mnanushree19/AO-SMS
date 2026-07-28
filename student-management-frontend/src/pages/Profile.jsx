import { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/profile/");
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    if (!profile) {
        return <h3>Loading...</h3>;
    }

    return (
        <div>
            <h2>My Profile</h2>
            <hr />

            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>Username</th>
                        <td>{profile.username}</td>
                    </tr>

                    <tr>
                        <th>Name</th>
                        <td>
                            {profile.first_name} {profile.last_name}
                        </td>
                    </tr>

                    <tr>
                        <th>Email</th>
                        <td>{profile.email}</td>
                    </tr>

                    <tr>
                        <th>Phone</th>
                        <td>{profile.phone}</td>
                    </tr>

                    <tr>
                        <th>Role</th>
                        <td>{profile.role}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Profile;