import toast from "react-hot-toast";

export default function notify_success(message: string) {
    toast.success(message, {
        position: "top-center",
    });
}

export function notify_info(message: string) {
    toast(message, {
        position: "top-center",
        icon: "ℹ️",
    });
}

export function notify_error(message: string) {
    toast.error(message, {
        position: "top-center",
    });
}
