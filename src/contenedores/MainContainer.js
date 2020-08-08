import React, { useState, useEffect } from 'react';
import Navbar from '../componentes/Navbar';
import Search from '../componentes/Search';
import GiftCard from '../componentes/GiftCard';
import axios from 'axios';

const MainContainer = () => {

    const [gifs, setGifs] = useState([]);
    const [cargando, setCargando] = useState(false);

    const getGifs = (busqueda) => {

        setCargando(true);

        if (!busqueda) {
            busqueda = 'demo';
        }

        // PON TU API KEY
        const URL = `https://api.giphy.com/v1/gifs/search?api_key=AQUIVATUAPIKEY&q=${busqueda}&limit=5`;

        axios.get(URL)
            .then(respuesta => {
                setGifs(respuesta.data.data);
                setCargando(false);
            })
            .catch(error => {
                console.log(error);
                setCargando(false);
            });

    }

    useEffect(() => {
        getGifs();
    }, []);

    const mostrarCargando = () => {
        if (cargando) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>)
        }
    }

    return (
        <div>
            <Navbar />

            <div className="container">

                <Search getGifs={(getGifs)} />

                {mostrarCargando()}

                {gifs.map(gif => {
                    return (<GiftCard
                        key={gif.id}
                        imagen={gif.images.downsized_medium.url}
                        titulo={gif.title}
                        website={gif.url}
                    />
                    )
                }
                )}
            </div>

        </div>
    )
}

export default MainContainer;
