import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import Error from "./Error";
import Loading from "./Loading";
import Moment from "react-moment";

export const MainSearch = () => {
  let [query, setQuery] = useState("");
  let [city, setCity] = useState(null);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);
  let [show, setShow] = useState(false);
  const baseEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=`;
  //   const baseEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=`;

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const cityWeather = async () => {
    try {
      let response = await fetch(
        baseEndpoint + "milan&appid=38d4f5e2565f1af48c06c0650ae77747&units=metric"
      );
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setCity(data);
        setLoading(false);
        setError(false);
      } else {
        alert("something went wrong");
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    cityWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        baseEndpoint + query + "&appid=38d4f5e2565f1af48c06c0650ae77747&units=metric"
      );
      if (response.ok) {
        let iData = await response.json();
        setCity(iData);
        console.log(iData);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="text-light">
      <Col xs={6} className="mx-auto my-5">
        <h1 className="text-center">Weather App</h1>
      </Col>
      <Col xs={11} md={6} className="mx-auto my-4">
        <Form onSubmit={handleSubmit}>
          <Form.Control
            id="myForm"
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="Type a City and press Enter"
          />
        </Form>
      </Col>
      {loading && <Loading />}
      {error && <Error />}
      {city && (
        <>
          <Row>
            <Col
              xs={11}
              md={6}
              className="my-4 text-center d-flex myContainer p-3 justify-content-around mx-auto"
            >
              <div>
                <img
                  src={"http://openweathermap.org/img/w/" + city.list[0].weather[0].icon + ".png"}
                  alt={city.list[0].weather[0].description}
                />
                <h2>
                  {city.city.name}, {city.city.country}
                </h2>
                <p className="fs-1">{city.list[0].main.temp} °C</p>
              </div>
              <div className="mt-4">
                <p className="fs-2">
                  <BiUpArrow className="text-warning" /> {city.list[0].main.temp_max} °C
                </p>
                <p className="fs-2">
                  <BiDownArrow className="text-primary" /> {city.list[0].main.temp_min} °C
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center text-center my-5">
            <Col xs={11} md={6} className="myContainer p-3">
              <h3 className="my-4">More info:</h3>
              <p className="fs-5 ">Weather: {city.list[0].weather[0].description}</p>
              <p className="fs-5 ">Wind speed: {city.list[0].wind.speed} Km/h</p>
              <p className="fs-5">Feels like: {city.list[0].main.feels_like} °C</p>
              <p className="fs-5">Humidity: {city.list[0].main.humidity} %</p>
              <p className="fs-5">Pressure: {city.list[0].main.pressure} hPa</p>
            </Col>
          </Row>
          <Col xs={6} className="mx-auto my-5 text-center">
            <Button onClick={() => setShow(!show)} variant="outline-light">
              See Tomorrow Forecast
            </Button>
          </Col>
          {show && (
            <>
              <Col xs={6} className="mx-auto mt-5 mb-2">
                <Moment className="text-center fs-3" format="DD-MM-YY HH:mm">
                  {city.list[6].dt_txt}
                </Moment>
              </Col>
              <Row>
                <Col
                  xs={11}
                  md={6}
                  className="my-4 text-center d-flex myContainer p-3 justify-content-around mx-auto"
                >
                  <div>
                    <img
                      src={
                        "http://openweathermap.org/img/w/" + city.list[6].weather[0].icon + ".png"
                      }
                      alt={city.list[6].weather[0].description}
                    />
                    <h2>
                      {city.city.name}, {city.city.country}
                    </h2>
                    <p className="fs-1">{city.list[6].main.temp} °C</p>
                  </div>
                  <div className="mt-4">
                    <p className="fs-2">
                      <WiHumidity className="text-primary" /> {city.list[6].main.humidity} %
                    </p>
                    <p className="fs-2">
                      <FiWind className="text-primary" /> {city.list[6].wind.speed} Km/h
                    </p>
                  </div>
                </Col>
              </Row>

              <Col xs={6} className="mx-auto mt-5">
                <Moment className="text-center fs-3" format="DD-MM-YY HH:mm">
                  {city.list[8].dt_txt}
                </Moment>
              </Col>
              <Row>
                <Col
                  xs={11}
                  md={6}
                  className="my-4 text-center d-flex myContainer p-3 justify-content-around mx-auto"
                >
                  <div>
                    <img
                      src={
                        "http://openweathermap.org/img/w/" + city.list[8].weather[0].icon + ".png"
                      }
                      alt={city.list[8].weather[0].description}
                    />
                    <h2>
                      {city.city.name}, {city.city.country}
                    </h2>
                    <p className="fs-1">{city.list[8].main.temp} °C</p>
                  </div>
                  <div className="mt-4">
                    <p className="fs-2">
                      <WiHumidity className="text-primary" /> {city.list[8].main.humidity} %
                    </p>
                    <p className="fs-2">
                      <FiWind className="text-primary" /> {city.list[8].wind.speed} Km/h
                    </p>
                  </div>
                </Col>
              </Row>

              <Col xs={6} className="mx-auto mt-5">
                <Moment className="text-center fs-3" format="DD-MM-YY HH:mm">
                  {city.list[10].dt_txt}
                </Moment>
              </Col>
              <Row className="mb-5">
                <Col
                  xs={11}
                  md={6}
                  className="my-4 text-center d-flex myContainer p-3 justify-content-around mx-auto"
                >
                  <div>
                    <img
                      src={
                        "http://openweathermap.org/img/w/" + city.list[10].weather[0].icon + ".png"
                      }
                      alt={city.list[10].weather[0].description}
                    />
                    <h2>
                      {city.city.name}, {city.city.country}
                    </h2>
                    <p className="fs-1">{city.list[10].main.temp} °C</p>
                  </div>
                  <div className="mt-4">
                    <p className="fs-2">
                      <WiHumidity className="text-primary" /> {city.list[10].main.humidity} %
                    </p>
                    <p className="fs-2">
                      <FiWind className="text-primary" /> {city.list[10].wind.speed} Km/h
                    </p>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </Container>
  );
};
