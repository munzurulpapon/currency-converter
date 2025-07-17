const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn =document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr =document.querySelector(".to select");
const msg =document.querySelector(".msg");







for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newOptn = document.createElement("option");
        newOptn.innerText = currcode;
        newOptn.value = currcode;

        if (select.name === "from" && currcode === "USD") {
            newOptn.selected = "selected";
        } else if (select.name === "to" && currcode === "INR") {
            newOptn.selected = "selected";
        }

        select.append(newOptn);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    if (img && countryCode) {
        img.src = newsrc;
    }
};

btn.addEventListener("click",  (evt)=>{
    evt.preventDefault();
    updateexchangerate();

})

const updateexchangerate = async ()=>{

    let amount =document.querySelector(".amount input");
    let amtvalue=amount.value;
    
    if(amtvalue==="" || amtvalue<1)
    {
        amtvalue=1;
        amount.value=1;
    }
    //console.log(fromcurr.value,tocurr.value);

    const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();

  const URL = `${BASE_URL}/${from}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  let rate = data[from][to];
  let finalAmount = (amtvalue * rate).toFixed(2);
  msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

}

window.addEventListener("load",()=>{
updateexchangerate();

})