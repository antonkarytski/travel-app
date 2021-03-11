const dummyLang = {
    lang: "",
    countryName: "",
    shortText: "",
    capitalName: "",
    preview: "",
    countryPhotos:[],
    countryRate: 0,
    countryCoordinates: [],
}



export function destructCountry(countryDataFromClient, dummy = dummyLang){
    const countryStructure = {
        ...countryDataFromClient.data,
        langData: []
    }

    const langCountryStructure = []
    for(let lang in countryDataFromClient.data.langData){
        if(countryDataFromClient.data.langData.hasOwnProperty(lang)){
            const langData = {lang}
            for(let dummyKey in dummy){
                if(countryDataFromClient.data.langData[lang][dummyKey] !== undefined){
                    langData[dummyKey] = countryDataFromClient.data.langData[lang][dummyKey]
                }

            }
            countryStructure.langData.push(langData);
        }
    }

    return {
        countryData: countryStructure,
    }
}

export function structCountries(countriesDataFromServer){
    const structure = {}
    for(let i = 0; i < countriesDataFromServer.countries.length; i++){

        const countryCode = countriesDataFromServer.countries[i].countryCode

        structure[countryCode] = countriesDataFromServer.countries[i]
        // delete structure[countryCode].__id
        // delete structure[countryCode].__v

        const countryLangData = {};
        for (let i = 0; i < structure[countryCode].langData.length; i++) {
            countryLangData[structure[countryCode].langData[i].lang] = structure[countryCode].langData[i]
        }
        structure[countryCode].langData = countryLangData


    }
    return structure
}

