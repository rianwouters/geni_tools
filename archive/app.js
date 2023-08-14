Geni = require('../jsdk.js');

Geni.init({
    app_id: 'YOUR_APP_KEY'
});

Geni.connect(response => {
    if(response.status == 'authorized') {
        console.log("authorized")
    } else {
        console.log("not authorized")
    }
});