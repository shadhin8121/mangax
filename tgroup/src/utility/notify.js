import toast from "react-hot-toast";

export default function notify_success(message) {
    toast.success(message, {
        position: "top-center",
    });
}

export function notify_info(message) {
    toast(message, {
        position: "top-center",
        icon: "ℹ️",
    });
}

export function notify_error(message) {
    toast.error(message, {
        position: "top-center",
    });
}
