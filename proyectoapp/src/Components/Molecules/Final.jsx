import React, { useState } from "react";
import Nav from "../Atomos/Nav";
import Contenedor from "../Atomos/Contenedor";
import Titulo from "../Atomos/Titulo";
import Caja from "../Atomos/Caja";
import Input from "../Atomos/Input";
import Button from "../Atomos/Button";
import Select from "../Atomos/Select";

function Final() {
  const [importe, setImporte] = useState(0);
  const [error, setError] = useState(false);
  const [ofCurrency, setOfCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [conversionResult, setConversionResult] = useState(null);

  const handleImporteChange = (event) => {
    const inputValue = event.target.value;
    setImporte(inputValue);
    if (!/^\d+$/.test(inputValue)) {
      setError("Solo acepta numeros ");
    } else {
      setError("");
    }
  };

  const handleOfCurrencyChange = (event) => {
    const inputValue = event.target.value;
    setOfCurrency(inputValue);
  };

  const handleToCurrencyChange = (event) => {
    const inputValue = event.target.value;
    setToCurrency(inputValue);
  };

  
  const MostrarData = () => {
    fetch('http://localhost:8080/api/producto').then(
      response => response.json()
    ).then(data=> {
      alert(JSON.stringify(data))
    })
  
  };



  const handleConvertirClick = async () => {
    if (error) {
      return;
    }
    const response = await fetch(
      "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_RbUhBaNuG1pBOzeUNm62ZcQ9ZE3K2EQ6iCaz09eZ&base_currency=" +
        ofCurrency +
        "&currencies=" +
        toCurrency
    );
    const divisas = await response.json();
    const conversion = importe * Object.values(divisas.data)[0];
  
    //aqui guarde el registro ala db
  
    fetch("http://localhost:8080/api/producto", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ importe, ofCurrency, toCurrency, conversion }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setConversionResult(conversion); 
      });
  };

  return (
    <>
      <Nav></Nav>
      <Contenedor>
        <Titulo>CONVERSOR DE DIVISAS</Titulo>
        <Caja>
          <Input
            type="text"
            placeholder="Importe"
            value={importe}
            onChange={handleImporteChange}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Select onChange={handleOfCurrencyChange}>
              <option value="" hidden>De</option>
              <option value="USD">USD - Dolar estadounidense</option>
              <option value="EUR">EUR - Euro</option>
              <option value="MXN">MXN - Peso mexicano</option>
              <option value="CAD">CAD - Dolar canadiense</option>
              <option value="GBP">GBP - Libra estarlina</option>
              <option value="AUD">AUD - Dolar Australiano</option>
              <option value="JPY">JPY - Yen Japones</option>
              <option value="RUB">ARS - Rublo Russo</option>
              <option value="BGN">BGN - Leva Bulgara </option>
              <option value="BRL">BRL - Real Brasileno </option>
          </Select>

          <Select onChange={handleToCurrencyChange}>
              <option value="" hidden>Para</option>
              <option value="USD">USD - Dolar estadounidense</option>
              <option value="EUR">EUR - Euro</option>
              <option value="MXN">MXN - Peso mexicano</option>
              <option value="CAD">CAD - Dolar canadiense</option>
              <option value="GBP">GBP - Libra estarlina</option>
              <option value="AUD">AUD - Dolar Australiano</option>
              <option value="JPY">JPY - Yen Japones</option>
              <option value="RUB">ARS - Rublo Russo</option>
              <option value="BGN">BGN - Leva Bulgara </option>
              <option value="BRL">BRL - Real Brasileno </option>
          </Select>
          <Button onClick={handleConvertirClick}>Convertir</Button>
          <Button onClick={MostrarData}>MostrarData</Button>

          {conversionResult !== null && (
      <p>La conversión es: {conversionResult} {toCurrency}</p>
    
          )}
          
        </Caja>
      </Contenedor>
    </>
  );
}
export default Final;