export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
