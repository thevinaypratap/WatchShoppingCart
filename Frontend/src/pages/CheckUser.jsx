function CheckUser(token) {
  function parseJwt(token) {
    try {
      // Split the token into header, payload, and signature
      const [headerBase64, payloadBase64] = token.split(".");

      // Decode the base64Url-encoded header and payload
      const decodedHeader = JSON.parse(decodeBase64(headerBase64));
      const decodedPayload = JSON.parse(decodeBase64(payloadBase64));

      // Return the decoded payload
      return decodedPayload;
    } catch (error) {
      console.error("Error parsing JWT:", error);
      return null;
    }
  }

  function decodeBase64(base64String) {
    try {
      return window.atob(base64String.replace(/-/g, "+").replace(/_/g, "/"));
    } catch (error) {
      console.error("Error decoding base64:", error);
      return "";
    }
  }

  try {
    const decodedClaims = parseJwt(token);
    if (decodedClaims) {
      const roles =
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
      const role = decodedClaims[roles];
      return role;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error checking user:", error);
    return null;
  }
}

export default CheckUser;
