console.log("Hello World");
import {API_KEY} from './vars.js'
async function main(){
    
    let cities_temp=[]
    let data = {}
    const cities = ["Munich","London","Madrid","Singapur","Barcelona","Lima","Santiago","Sidney","Tokio","Seul","Washington"]
    
    for (let c of cities){
        await axios.get("https://api.openweathermap.org/data/2.5/weather?q="+c+"&units=metric&appid="+API_KEY)
        .then(res=>cities_temp.push(
            data = {
                name:c,
                country_code: res.data['sys']['country'],
                coordinate: res.data['coord']['lon']+' '+ res.data['coord']['lat'],
                temp: res.data['main']['temp'] + '°C',
                pressure: res.data['main']['pressure'],
                humidity: res.data['main']['humidity'],
                }
        ))
        .catch(err=>console.log(err))
    }
    console.log(cities_temp)
    
    var target = document.getElementById("cities")
    if (target){
        cities_temp.map(c=>{
            return(
                target.innerHTML += `
                        <div class="col-md-6">
                            <div class="card card-body mb-3">
                                <p>${c.name}</p>
                                <h2>${c.temp}</h2>
                                <p>Pressure: ${c.pressure}hPa</p>
                                <p>Humidity: ${c.humidity}%</p>
                            </div>
                        </div>
                `
            )
        })
    }
    
}

main();