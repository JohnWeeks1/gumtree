export default {
    // General helpers
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    
    apiUrl() {
        return process.env.VUE_APP_API_URL;
    },
}