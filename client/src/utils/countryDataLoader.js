const data = require('../assets/countryData');
const fs = require('fs');

const countryList = [];

data.map(country => {
  country.callingCodes.forEach(callingCode => {
    countryList.push({
      name: country.name,
      nativeName: country.nativeName,
      alpha2Code: country.alpha2Code.toLowerCase(),
      callingCode,
    });
  });
});

console.log(countryList);

fs.writeFileSync('./result.js', JSON.stringify(countryList));
