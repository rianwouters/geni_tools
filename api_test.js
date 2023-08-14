import axios from 'axios';
import { Agent } from 'https';

try {
    const httpsAgent = new Agent({ rejectUnauthorized: false });

    const oauth_api = axios.create({
        baseURL: 'https://www.geni.com/platform/oauth/',
        httpsAgent
    });

    const { data: auth } = await oauth_api.post('request_token', {
        client_id: 'tYVPjJWvrYUMxCvVWLKd3sk7DLb6DF3xWuDtTbb1',
        client_secret: 'X9ebbsM1DJyhyclAkevbS4M60jGSkvGi9bWVHT2I',
        // username: 'rianwouters@hotmail.com',
        // password: 'ELhS0xmqxjpD0QyjDApU',
        grant_type: 'client_credentials' // password
    });

    console.log(auth);

    const api = axios.create({
        baseURL: 'https://www.geni.com/api/',
        httpsAgent
    });

    api.interceptors.request.use(
        r => {
            r.params = Object.assign(r.params,{access_token: auth.access_token});
            return r;
        }
    );

    const r = await api.get(`profile/search`, { params: {names: "Rian" }});
    console.log(r);


} catch (e) {
    // console.log(e)
    // console.log(e.stack);
    console.log(e.message);
}




