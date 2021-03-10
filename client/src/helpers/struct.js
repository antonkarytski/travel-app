const shortDummy = {
    lang: "",
    countryName: "",
    shortText: "",
    capitalName: "",
}
const fullDummy = {
    lang: "",
    countryCode: "",
    countryName: "",
    description: "",
    capitalName: "",
}


export function destructCountry(countryDataFromClient, dummies={shortDummy, fullDummy}){
    const countryStructure = {
        ...countryDataFromClient.data,
        langData: []
    }
    const {fullDummy, shortDummy} = dummies

    const langCountryStructure = []
    for(let lang in countryDataFromClient.data.langData){
        if(countryDataFromClient.data.langData.hasOwnProperty(lang)){
            const shortLangData = {lang}
            const fullLangData = {lang, countryCode: countryDataFromClient.countryCode}
            for(let shortDummyKey in shortDummy){
                if(countryDataFromClient.data.langData[lang][shortDummyKey] !== undefined){
                    shortLangData[shortDummyKey] = countryDataFromClient.data.langData[lang][shortDummyKey]
                }

            }
            for(let fullDummyKey in fullDummy){
                if(countryDataFromClient.data.langData[lang][fullDummyKey] !== undefined){
                    fullLangData[fullDummyKey] = countryDataFromClient.data.langData[lang][fullDummyKey]
                }
            }
            countryStructure.langData.push(shortLangData);
            langCountryStructure.push(fullLangData)
        }
    }

    return {
        countryData: countryStructure,
        langCountryData: langCountryStructure
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
        if(countriesDataFromServer.langCountries){
            const currentCountryLangs = countriesDataFromServer.langCountries.filter(county => {
                return county.countryCode === countryCode
            })
            for (let i = 0; i < currentCountryLangs.length; i++) {
                countryLangData[currentCountryLangs[i].lang] = {
                    ...countryLangData[currentCountryLangs[i].lang],
                    ...currentCountryLangs[i]
                }
                delete countryLangData[currentCountryLangs[i].lang].lang
                delete countryLangData[currentCountryLangs[i].lang].countryCode
            }

        }
        structure[countryCode].langData = countryLangData


    }
    return structure
}

