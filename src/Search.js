import { within } from '@testing-library/react';
import {useState} from 'react';

function Search(props){

    const [city, setCity] = useState('');

    function searchInput(e){

        e.preventDefault();

        let currentValue = document.querySelector('input[name=searchInput]').value;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric&lang=pt`;

        fetch(url)

        .then(response=> response.json())

        .then(data=>{

            const {main, name, sys, weather} = data;

            if(sys != undefined){               

            if(weather != undefined){                

                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${

             weather[0]["icon"]}.svg`;

                setCity(`

                <div class="containerCity">

                <p>Temperatura Cº: ${main.temp}</p>
                <p>Pressão: ${main.pressure} atm</p>
                <p>Humidade do ar: ${main.humidity}%</p>
                <p>Temperatura Mínima: ${main.temp_min}º</p>
                <p>Temperatura Máxima: ${main.temp_max}º</p>
                <p>País: ${sys.country}</p>
                <p>Cidade: ${name}</p>
                <p>${weather[0]['description']}</p>

                <img src="${icon}" />

                </div>

                `);

            }
            }else{
                setCity("");

            }
        })

    }

    return(
        <div className="searchWraper">
        <div className="search">
            <img src="capa-de-chuva.png" />

            <h2> Digite a cidade que você deseja saber a previsão do tempo. </h2>
            

            <form onSubmit={(e)=>searchInput(e)}>

            <input placeholder={props.placeholder}  type="text" name="searchInput" />

            <button type="submit" value="Pesquisar"> Pesquisar </button> 
            

            </form>

            </div>
            {
                (city!="")?
                <div dangerouslySetInnerHTML={{__html:city}} />:
                <div style={{padding:'8px'}}>  </div>
            }

            </div>

    )

}



export default Search;