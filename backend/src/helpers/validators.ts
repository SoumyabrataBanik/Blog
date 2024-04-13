export function validateSignUpDetails(details: string) {
    if (!details || details.trim() === "") {
        return false;
    }
    return true;
}
