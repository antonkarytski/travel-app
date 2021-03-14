import React, {useState } from "react";

export const Currency = (props) => {
  const [currentCurrency, setCurrency] = useState({time_last_update_unix: ''});
  const {countryCode} = props;
  const language = "EN"   //// заменить на данные из контекста

  const codeMap = {
    FR: {currency: 'EUR',
        currencyTitle: {'RU': 'Евро',
                        'EN': 'Euro',
                        'FR':'Euro'}
        },
    CH: {currency: 'CHF',
        currencyTitle: {'RU': 'Швейцарский франк',
                        'EN': 'Swiss franc',
                        'FR':'Franc suisse'}},
    IS: {currency: 'ISK',
        currencyTitle: {'RU': 'Исландская крона',
                        'EN': 'Iceland krone',
                        'FR':'Couronne islandaise'}},
    NZ: {currency: 'NZD',
        currencyTitle: {'RU': 'Новозеландский доллар',
                        'EN': 'New Zealand dollar',
                        'FR':'Dollar néo-zélandais'}},
    NO: {currency: 'NOK',
        currencyTitle: {'RU': 'Норвежская крона',
                        'EN': 'Norwegian krone',
                        'FR':'Couronne norvégienne'}},
    TH: {currency: 'THB',
        currencyTitle: {'RU': 'Тайский бат',
                        'EN': 'Thailand bath',
                        'FR':'Baht'}},
    PH: {currency: 'PHP',
        currencyTitle: {'RU': 'Филиппинское песо',
                        'EN': 'Philippine peso',
                        'FR':'Peso philippin'}},
    HR: {currency: 'HRK',
        currencyTitle: {'RU': 'Хорватская куна',
                        'EN': 'Croatian kuna',
                        'FR':'Kuna croate'}},
    BR: {currency: 'BRL',
        currencyTitle: {'RU': 'Бразильский реал',
                        'EN': 'Brazilian Real',
                        'FR':'Réal brésilien'}},
    LK: {currency: 'LKR',
        currencyTitle: {'RU': 'Шри-ланкийская рупия',
                        'EN': 'Sri Lanka Rupee',
                        'FR':'Roupie srilankaise'}},
    JP: {currency: 'JPY',
        currencyTitle: {'RU': 'Японская иена',
                        'EN': 'Japanese yen',
                        'FR':'Yen'}}
  }

  const textMap = {
    'RU': {
      title: 'Курс валют',
      dollar: 'Доллар США',
      euro: 'Евро',
      ruble: 'Рубль'
    },
    'EN': {
      title: 'Rate of exchange',
      dollar: 'US Dollar',
      euro: 'Euro',
      ruble: 'Ruble'
    },
    'FR': {
      title: 'Taux de change',
      dollar: 'Dollar américain',
      euro: 'Euro',
      ruble: 'Rouble'
    }
  }

  let data;

  const countryCurrency = codeMap[countryCode].currency;
  const currencyName = codeMap[countryCode].currencyTitle[language];

  const getData = async (currency) => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/675fab136db2f695f21dbba6/latest/ ${currency}`)
      .then(res => res.json())
      if(response.result == 'success' && response.time_last_update_unix != currentCurrency.time_last_update_unix) {
        setCurrency(response);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  ///// раскомментировать перед сдачей проекта, иначе закончится количетсво бесплатных попыток отправки api
  // useEffect(() => {
  //   getData(countryCurrency);
  // }, []);
  
  return (
    <div>
      <h2>{textMap[language].title}</h2>
      <div>{currencyName}</div>
      <div>{textMap[language].dollar}: {currentCurrency.conversion_rates ? currentCurrency.conversion_rates.USD : ''}</div>
      <div>{textMap[language].euro}: {currentCurrency.conversion_rates ? currentCurrency.conversion_rates.EUR : ''}</div>
      <div>{textMap[language].ruble}: {currentCurrency.conversion_rates ? currentCurrency.conversion_rates.RUB : ''}</div>
    </div>
  )
}
