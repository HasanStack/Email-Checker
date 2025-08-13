// const populate = async (value, currency) => {
//     let myStr = ""
//        let url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_PbroxJqJau57XP17FAvMdgBE6NPjV82CC9bjjqDf&base_currency=" + currency;
//     let response = await fetch(url)
//      let rJson = await response.json()
//     document.querySelector(".output").style.display = "block"

//     for (let key of Object.keys(rJson["data"])) {
//         myStr +=`<tr>
//                     <td>${key}</td>
//                     <td>${rJson["data"][key]["code"]}</td>
//                     <td>${Math.round(rJson["data"][key]["value"] * value)}</td>
//                 </tr> 
//                 `
//     }
//     const tableBody = document.querySelector("tbody");
//     tableBody.innerHTML = myStr;
// }

// const btn = document.querySelector(".btn")
// btn.addEventListener("click", (e) => {
//     e.preventDefault()
//     const value = parseInt(document.querySelector("input[name='quantity']").value);
//     const currency = document.querySelector("select[name='currency']").value
//     populate(value, currency)
// })
/*
const populate = async (value, currency) => {
    let myStr = "";
    let url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_PbroxJqJau57XP17FAvMdgBE6NPjV82CC9bjjqDf&base_currency=" + currency;
    
    let response = await fetch(url);
    let rJson = await response.json();
    
    document.querySelector(".output").style.display = "block";

    for (let key of Object.keys(rJson["data"])) {
        myStr += `
            <tr>
                <td>${key}</td>
                <td>${rJson["data"][key]["code"]}</td>
                <td>${(rJson["data"][key]["value"] * value).toFixed(4)}</td>
            </tr>
        `;
    }
    document.querySelector("tbody").innerHTML = myStr;
};

const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = parseFloat(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;
    populate(value, currency);
});
*/
const populate = async (value, currency) => {
    try {
        let myStr = "";
        let url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_PbroxJqJau57XP17FAvMdgBE6NPjV82CC9bjjqDf&base_currency=${currency}`;
        
        let response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch currency data");
        
        let rJson = await response.json();
        
        document.querySelector(".output").style.display = "block";

        for (let key of Object.keys(rJson["data"])) {
            let convertedValue = rJson["data"][key]["value"] * value;
            myStr += `
                <tr>
                    <td>${key}</td>
                    <td>${rJson["data"][key]["code"]}</td>
                    <td>${convertedValue.toLocaleString(undefined, { minimumFractionDigits: 4 })}</td>
                </tr>
            `;
        }
        document.querySelector("tbody").innerHTML = myStr;
    } catch (error) {
        alert("Error: " + error.message);
    }
};

const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = parseFloat(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;

    if (isNaN(value) || value <= 0) {
        alert("Please enter a valid quantity greater than 0");
        return;
    }

    populate(value, currency);
});
