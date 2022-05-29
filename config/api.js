// export const baseDevApi = 'https://pl-app-ep1.polkalokr.com/';
export const baseDevApi = process.env.VUE_APP_DEV_API_BASE_URL || "http://localhost:3000/v1";

//export const baseDevApi = 'http://localhost:3000/';

export const baseDevAuthApi = baseDevApi + 'auth/';
