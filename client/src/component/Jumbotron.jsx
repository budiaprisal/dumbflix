import Carousel from "react-bootstrap/Carousel";
import Title1 from "../assets/image/Thewitchertitle.png";
import { NavLink } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { FaPlay } from "react-icons/fa";

export default function Jumbotrons() {
  const [state] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  // Fetching Film data from database
  let { data: films } = useQuery("filmCache", async () => {
    const response = await API.get("/films");
    console.log(response.data.data);
    return response.data.data;
  });

  let asceding = [];
  if (films !== undefined) {
    //operator spread
    asceding = [...films];
    //sort mengurutkan films berdasarkan id
    asceding.sort((a, b) => b.id - a.id);
  }
  return (
    <Container className="mt-4 pt-5 rounded">
      <Carousel>
        {asceding?.map((item) => {
          console.log(item);
          return (
            <Carousel.Item>
              <img
                key={item.id}
                className="w-75 align-content-center"
                src={`http://localhost:5000/uploads/${item.thumbnailfilm}`}
                alt="First slide"
              />
              <Carousel.Caption className="mb-5">
                <h1 className="fw-bold" style={{ fontSize: "70px" }}>
                  {item.title}
                </h1>
                <div style={{ paddingLeft: "69px", paddingRight: "69px" }}>
                  <p>{item.description}</p>
                  <div className="d-flex gap-3 justify-content-center">
                    <p>{item.year}</p>
                    <p className="border border-2 rounded pe-3 ps-3 shadow-lg">
                      {item.category.name}
                    </p>
                  </div>
                  <NavLink
                    to={`/detail/${item.id}`}
                    className="text-decoration-none"
                  >
                    <Button
                      style={{
                        backgroundColor: "#E50914",
                        border: "none",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      <FaPlay /> Watch Now!{" "}
                    </Button>
                  </NavLink>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Container>
  );
}
