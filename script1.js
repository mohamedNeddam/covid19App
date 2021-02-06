const coutryList = document.querySelector(".coutryList");
let str = '';

const countryClicked = (e) => {
    let code = e.target.getAttribute('id');
    const req1 = new XMLHttpRequest();
    console.log(code);
    req1.open("GET","https://api.covid19api.com/dayone/country/"+code );
   // console.log(e.target.innerHTML);
   req1.onreadystatechange = function(){
  
    if(this.readyState === 4 && this.status === 200){
            let raw = JSON.parse(req1.response);
            let labels  = raw.map(e => e.Date);
            let confiremed = raw.map(e => e.Confirmed);
            let recovered = raw.map(e => e.Recovered);
            let active = raw.map(e => e.Active);
            let deaths = raw.map(e => e.Deaths);

            let datasets = [{
                label: "Confiremed",
                data: confiremed,
                borderColor: "orange"
            },
            {
                label: "Recovered",
                data: recovered,
                borderColor: "green"
            },
            {
              label: "Active",
              data: active,
              borderColor: "blue"
          },
          {
            label: "Deaths",
            data: deaths,
            borderColor: "red"
        }
            ]
            mychart.data.labels = labels;
            mychart.data.datasets = datasets;
            mychart.update();
            console.log(confiremed);
    }
}


req1.send();

}
 


const req = new XMLHttpRequest();

const url = "https://api.covid19api.com/countries";
const methode = 'GET';

req.open(methode,url,true);
req.setRequestHeader('X-Access-Token', '5cf9dfd5-3449-485e-b5ae-70a60e997864');

req.onreadystatechange = function(){
  
    if(this.readyState === 4 && this.status === 200){
       
     
            let raw = JSON.parse(req.response);

            res = raw.sort((a,b) => a.Country>b.Country?1:-1);

            res.forEach(e => {
                let country = document.createElement("div");
                country.classList.add("cntr");
                country.setAttribute("id",e.ISO2);
                country.innerHTML=e.Country;
                country.addEventListener("click",countryClicked);
                coutryList.appendChild(country);
            });

            console.log(res);
    }
}


req.send();









  let mychart =   new Chart(document.getElementById("myChart"), {
        type: 'line',
        data: {
          labels: [],
          datasets: []
        },
        options: {
          title: {
            display: true,
            text: 'COVID 19 statistics '
          }
        }
      });
      