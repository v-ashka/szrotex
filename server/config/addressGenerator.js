const fs = require('fs'); 
const regions = [  "Dolnośląskie", "Kujawsko-pomorskie", "Lubelskie", "Lubuskie",
    "Łódzkie", "Małopolskie", "Mazowieckie", "Opolskie", "Podkarpackie",
    "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie",
    "Warmińsko-mazurskie", "Wielkopolskie", "Zachodniopomorskie" ];

const cities = [
    "Warszawa", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk",
    "Szczecin", "Bydgoszcz", "Lublin", "Białystok", "Katowice",
    "Gdynia", "Częstochowa", "Radom", "Toruń", "Sosnowiec"
]

function generateRandomZip(){
    return `${Math.floor(Math.random() * 100).toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
}

function generateAddresses(count){
    const addresses = [];

    for(let i=0; i<count; i++){
        addresses.push({
            country: "Poland",
            region: regions[Math.floor(Math.random() * regions.length)],
            city: cities[Math.floor(Math.random() * cities.length)],
            zip: generateRandomZip()
        })
    }

    return { addresses };
}

const addressData = generateAddresses(50);
fs.writeFileSync('address-seed.json', JSON.stringify(addressData, null, 2));
console.log('Generated address-seed.json file')

module.exports = generateAddresses(count);