window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const input1 = document.querySelector('#inpu1'),
        input2 = document.querySelector('#inpu2'),
        lable = document.getElementById('lableMoney'),
        inputContainer = document.querySelector('.inputs__container'),
        select = document.getElementById('select'),
        url = 'http://api.currencylayer.com/live?access_key=c9a484f5bf4a1dce8ee17f6ea3b4ff79';

  let seleckValye,
    koff = 0,
    usdRub,
    usdEur;

  select.addEventListener('change', () => {
    if (select.value === '0') {
      lable.textContent = 'долларов США';
    }
    if (select.value === '1') {
      lable.textContent = 'евро';
    }
    input1.value = '';
    input2.value = '';
  });

  const checkingMoney = () => {
    seleckValye = select.value;
  };

  const getData = (url) => {
    return fetch (url);
  };

  const getChangCurs = (responce) => {
    const data = JSON.parse(responce);
      usdRub = +data.quotes.USDRUB;
      usdEur = +data.quotes.USDEUR;
  };

  inputContainer.addEventListener('change', (event) => {
      let target = event.target;
      target.style.border = 'none';

      if (!/^[0-9]*[.,]?[0-9]+$/.test(target.value)) {
        target.style.border = '2px solid red';
        target.value = '';
        return;
      }

    getData(url)
    .then((responce) => {
      if (responce.status !== 200) {
        throw new Error('status network not 200.');
      }
        return responce.text();
    })
    .then(getChangCurs)
    .then(checkingMoney)
    .then(() => {
      if (seleckValye === '0') {
        koff = usdRub;
      } else {
        koff = usdRub / usdEur;
      }
      if (target === input1) {
        let value = +target.value / koff;
        input2.value = value.toFixed(2);
      }
      if (target === input2) {
        let value = +target.value * koff;
        input1.value = value.toFixed(2);
      }
    })
    .catch(error => {
      console.warn(error);
      alert('Отсутсвут связь с сервером. Попробуйте позже.');
    });
  });
});
