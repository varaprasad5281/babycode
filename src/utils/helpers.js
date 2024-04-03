import CryptoJS from "crypto-js";

// auth middleware
export const checkAuth = () => {
  const userData = localStorage.getItem("userData");
  return userData !== null;
};

// create timestamp
export const getTimestamp = () => {
  const currentDate = new Date();

  // Get the timestamp in milliseconds since the Unix epoch (January 1, 1970)
  const timestamp = currentDate.getTime();

  const timestampInSeconds = Math.floor(timestamp / 1000);
  //   console.table({ timestamp, timestampInSeconds });
  return timestamp;
};

// generate random string
export const generateRandomString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < 18; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
};

//create jwt token
export const createJwt = (body) => {
  body["time"] = getTimestamp();

  const AccessToken = {
    jwtTokenKey: "120k%#n)^(don(omv4fg_-$8v+mm!(sy%#(h(=v%f+ywykd0(^",
    jwtTokenHeader: { alg: "HS256", typ: "JWT" },
  };

  // Serialize the header and body to JSON strings
  const headerString = JSON.stringify(AccessToken.jwtTokenHeader);
  const bodyString = JSON.stringify(body);

  // Base64 encode the header and body strings
  const headerBase64 = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(headerString)
  );
  const bodyBase64 = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(bodyString)
  );

  // Construct the message by concatenating the header and body
  const message = `${headerBase64}.${bodyBase64}`;

  // Generate HMAC-SHA256 hash using the secret key
  const hmacDigest = CryptoJS.HmacSHA256(message, AccessToken.jwtTokenKey);

  // Base64 encode the HMAC digest
  const signature = CryptoJS.enc.Base64.stringify(hmacDigest);

  // Construct the JWT token by concatenating the message and signature
  const jwtToken = `${message}.${signature}`;

  return jwtToken;
};

// format date string
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};