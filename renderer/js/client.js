const axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })
axios.defaults.httpsAgent = httpsAgent

document.getElementById('form').onsubmit = function() { 
  let isoCode = document.getElementById('isoCode').value;
  isoCode = isoCode.toUpperCase();
  
var soap = require('soap');
var url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
var args = {'sCountryISOCode': isoCode};
options = {
    request: axios,
    disableCache : true
};
soap.createClient(url, options, function(err1, client) {
    if(err1){
      throw err1;
    }
       client.addSoapHeader(function(methodName, args, headers, req) {
        console.log('Adding headers for method', methodName);
      });
    client.FullCountryInfo(args, function(err2, result) {
        if(err2){
          throw err2;
        }        
        document.getElementById('output').innerHTML = "Country: " + result.FullCountryInfoResult.sName + "<br>" + "Capital City: " + result.FullCountryInfoResult.sCapitalCity
        +"<br>"+ "Language: "+ result.FullCountryInfoResult.Languages.tLanguage[0].sName +"<br>"+ "Currency: " +result.FullCountryInfoResult.sCurrencyISOCode + "<br>" + "Phone Code: " + result.FullCountryInfoResult.sPhoneCode; + ""  
    });
    document.getElementById("result").classList.remove('hidden');
    document.getElementById("result").classList.add('block');

  console.log("request has been made");
});

return false;
};


