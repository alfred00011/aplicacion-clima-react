import { useState } from "react"

export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '317fc6c4dadf707ddd87e213655be175'
    const difkelvin = 273.15

    const [ciudad, setCiudad] = useState('')
    const [clima, setClima ] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const dataClima = await response.json()
            setClima(dataClima)

        } catch(error) {
            console.error('Ocurrio un problema: ', error)
        }

    }

    return(
        <div className="container">
            <h1>Aplicacion de Clima</h1>
            <form onSubmit= {handleSubmit}>
                <input 
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                 />
                 <button type="submit">Buscar</button>
            </form>
            {
                clima && (
                    <div>
                        <h2>Nombre : {clima.name}</h2>
                        <p>Temperatura : {parseInt(clima?.main?.temp - difkelvin)}ºc</p>
                        <p>Condición meteorológica : {clima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}/>
                    
                    </div>
                )
            }

        </div>
    )
}