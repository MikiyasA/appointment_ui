import dayjs from "dayjs";

/**
 * Fetches JSON data from the backend API.
 *
 * This function makes a GET request to the URL formed by combining the base URL
 * (defined in the environment variable `BE_BASE_URL`) and the provided `reference` path.
 *
 * @param {string} reference - The relative path to append to the backend base URL.
 *   Example: if `reference` is `/users/1`, the full request URL will be `${BE_BASE_URL}/users/1`.
 *
 * @returns {Promise<any>} - A promise that resolves to the parsed JSON response.
 *
 * @example
 * const user = await getData('users/1');
 */
export const getData = async (reference: string): Promise<any> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/${reference}`)
    const data = await res.json()
    return data
}

/**
 * Sends a POST request to the backend API with the given reference path and request body.
 *
 * @param {string} reference - API endpoint path relative to the base URL (e.g., 'submit-form').
 * @param {any} body - The request payload to be sent as JSON.
 * @param {'POST' | 'PUT' | 'PATCH'} method - The request method.
 * @param {boolean}   useFormData: boolean = false, whether to use form data or not, if file is uploaded, set true for useFormData
 - The request method.
 *
 * @returns {Promise<any>} - A promise that resolves with the parsed JSON response from the server. { data, status: res.status }
 *
 * @example
 * const response = await postData("appointments/create", {
 *   userId: "123",
 *   date: "2025-08-03",
 *   time: "08:00"
 * });
 */
export const postData = async (
    reference: string,
    body: any,
    method: 'POST' | 'PUT' | 'PATCH',
    useFormData: boolean = false
): Promise<any> => {
    let requestBody: BodyInit;
    let headers: HeadersInit = {};

    if (useFormData) {
        const formData = new FormData();
        for (const key in body) {
            if (body[key] !== undefined && body[key] !== null) {
                const value = body[key];
                // Convert objects/arrays to JSON strings
                formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
            }
        }
        requestBody = formData;
        // Don't set content-type manually — the browser sets it for FormData
    } else {
        requestBody = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/${reference}`, {
        method,
        headers,
        body: requestBody,
    });

    if (!res.ok) {
        console.error(`POST request failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return { data, status: res.status };
};


/**
 * Convert and format the ISO string date to DD-MMM-YYYY.
 *
 * @param {string} date - the ISO string date.
 * @returns {string} - Formatted date like "25-Aug-2025"
 */
export const formatDate = (date: string): string => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = d.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", ...
    const day = String(d.getDate()).padStart(2, "0"); // Ensure 2-digit day

    return `${day}-${month}-${year}`; // e.g. 2025-Aug-25
};

/**
 * Convert and format the ISO string date to DD-MMM-YYYY h:mm AM/PM.
 *
 * @param {string} date - the ISO string date.
 * @returns {string} - Formatted date like "25-Aug-2025 8:00 AM"
 */
export const formatDateTime = (date: string): string => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = d.toLocaleString("en-US", { month: "short" });
    const day = String(d.getDate()).padStart(2, "0");

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const amPM = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; // 0 => 12 for 12 AM/PM
    const formattedHours = String(hours); // no padStart so "8" not "08"

    return `${day}-${month}-${year} ${formattedHours}:${minutes} ${amPM}`;
};

/**
 * Convert and format the ISO string date to time HH:MM AM/PM.
 *
 * @param {string} date - the ISO string date.
 * @returns {string} - Formatted time like "6:10 AM"
 */
export const formatTime = (date: string): string => {
    const d = new Date(date);

    const formattedTime = d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return formattedTime;
};

export function formatCamelCaseLabel(camelCase: string): string {
    return camelCase
        .replace(/([A-Z])/g, ' $1') // insert space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // capitalize the first letter
}

