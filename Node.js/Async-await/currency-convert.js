//http://data.fixer.io/api/latest?access_key=3f144bb3405456657ec931bfe187002e
//https://restcountries.eu/rest/v2/currency/USD
const axios = require('axios');

// const getExchangeRate = (from,to) => {
//    return axios.get('http://data.fixer.io/api/latest?access_key=3f144bb3405456657ec931bfe187002e')
//         .then(response =>{
//             const euro = 1/ response.data.rates[from];
//             const rate = euro * response.data.rates[to];
//             return rate;
//         });
// }

const getExchangeRate = async (from,to) => {
    try{
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=3f144bb3405456657ec931bfe187002e')
        const euro = 1/ response.data.rates[from];
        const rate = euro * response.data.rates[to];
        if(isNaN(rate)){
            throw new Error();
        }
        return rate;
    }catch(e){
        throw new Error('UNable to get exchange rate')
    }
    
 };

 const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)

        return response.data.map(country => country.name)
    
    } catch(e) {
        throw new Error ('Unable to get countries')
    }
    }
   

    // const convertCurrency = (from, to ,amount) => {
    //     let convertedAmt;
    //     getExchangeRate(from, to).then(rate => {
    //          convertedAmt = (amount * rate.toFixed(2));
    //         return getCountries(to);
    //     }).then( countries => {
    //         return `${amount} ${from} is worth ${convertedAmt} ${to}. You can spend it in the following countries: ${countries.join(', ')}` 
    //     })
    // }
const convertCurrency = async ( from, to, amount) => {
    const rate = await getExchangeRate(from,to);
    const countries = await getCountries(to);
    const convertedAmt = (amount * rate.toFixed(2));
    return `${amount} ${from} is worth ${convertedAmt} ${to}. You can spend it in the following countries: ${countries.join(', ')}` ;

}

convertCurrency('USD','EUR', 20).then(message =>{
    console.log(message);
});