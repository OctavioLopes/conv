import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { requestData } from '../config/request';
import '../style/Home.scss'

function Home() {
     const [text, setText] = useState('')
     const [data, setData] = useState()
     const [filteredDataByName, setFilteredDataByName] = useState()
     const [filteredDataByDesc, setFilteredDataByDesc] = useState()
     const Navigate = useNavigate();

     const Nav = (element) => {
        console.log(element)
        window.open(element, '_blank');
     }

     const receiptData = () => {
          const data = requestData();
          setData(data);
     }

     const concatedDesc = (text) => {
        const maxLength = 100;
        if (text.length > maxLength) {
            return text.substr(0, maxLength) + '...';
        } else {
            return text;
        }
     }

     const concatedDesc02 = (text) => {
        const maxLength = 170;
        if (text.length > maxLength) {
            return text.substr(0, maxLength) + '...';
        } else {
            return text;
        }
     }

     const selectfilter = (e) => {
        setText(e)
        if (e === '') {
            setFilteredDataByName(data);
          } else {
            const filtered = data.filter((item) =>
              item.name.toLowerCase().includes(e.toLowerCase())
            );
            const firstThreeItems = filtered.slice(0, 3);
            setFilteredDataByName(firstThreeItems);
          }
        if (e === '') {
            setFilteredDataByDesc(data);
          } else {
            const filtered = data.filter((item) =>
              item.description.toLowerCase().includes(e.toLowerCase())
            );
            const firstThreeItems = filtered.slice(0, 3);
            setFilteredDataByDesc(firstThreeItems);
          }
     }

     useEffect(() => {
          fetch(receiptData())
     })

     return (
     <body className="Home">
        <input className="filter-input" placeholder="Filtrar Palavra..." onChange={ (e) => selectfilter(e.target.value)}></input>
        <div>
            {(text !== undefined && text !== '') ?
            <ul>
                {filteredDataByName.map((element, index) => (
                    <li key={index}>
                        <button onClick={ () => Nav(element.link)}>
                            <h2>{element.name}</h2>
                            <p>{concatedDesc(element.description)}</p>
                        </button>
                    </li>
                ))}
            </ul>
            : null}
        </div>
        <div>
            {(text !== undefined && text !== '') ?
            <ul>
                {filteredDataByDesc.map((element, index) => (
                    <li key={index}>
                        <button onClick={ () => Nav(element.link)}>
                            <h5>{element.name}</h5>
                            <p>{concatedDesc02(element.description)}</p>
                        </button>
                    </li>
                ))}
            </ul>
            : null}
        </div>
     </body>
     );
}

export default Home;