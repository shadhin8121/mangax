import { atom } from "jotai";
// export const themeDarkOrLight = atom(false);
export const changedOrNot = atom("");

interface profileData {
    username: string;
    cover_image: string;
    email: string;
    created_at: string;
}
export const global_profile_data = atom<profileData | undefined>(undefined);

export const check_login_status = atom<boolean | undefined>(false);
