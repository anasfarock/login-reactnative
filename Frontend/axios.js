import axios from 'axios';
import { Platform } from 'react-native';

const getBaseURL = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') return 'http://10.0.2.2:8080/v1/api'; // emulator
    return 'http://192.168.100.10:8080/v1/api'; // your IP for real device or iOS sim
  }
  return 'https://your-prod-url.com/v1/api'; // future production backend
};

const API = axios.create({
  baseURL: getBaseURL(),
});

export default API;

// import axios from 'axios';
// import { Platform } from 'react-native';

// // Get correct host based on platform
// const getBaseUrl = () => {
//   if (__DEV__) {
//     if (Platform.OS === 'android') {
//       return 'http://10.0.2.2:8080/v1/api'; // Android emulator
//     } else {
//       return 'http://localhost:8080/v1/api'; // iOS simulator
//     }
//   } else {
//     return 'https://your-production-url.com/v1/api'; // for deployed production backend
//   }
// };

// const API = axios.create({
//   baseURL: getBaseUrl(),
// });

// export default API;
