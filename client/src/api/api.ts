const base_url = "http://localhost:4043";

//getting profile data
export async function getProfileData() {
    const response = await fetch(`${base_url}/profile_data`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Network response was not ok"); // This will trigger the onError callback
    }

    const data = await response.json();
    return data.data;
}

//logout user
export async function logoutUser() {
    const response = await fetch(`${base_url}/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("network response was not ok");
    }

    const data = await response.json();
    return data;
}
