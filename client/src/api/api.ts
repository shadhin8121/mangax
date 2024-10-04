import { notify_error } from "@/utility/host_toast";

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

//uploading cover image
