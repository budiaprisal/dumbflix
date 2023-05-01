import { Card, Col, Container, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../App.css";
import { API } from "../config/api";
import { useEffect } from "react";

function ListFilm() {
  const navigate = useNavigate();

  const {
    data: films,
    refetch,
    isLoading,
  } = useQuery("moviesListCache", async () => {
    const response = await API.get("/films");
    console.log(response);
    return response.data.data;
  });

  const deleteHandle = useMutation((id) => {
    try {
      Swal.fire({
        title: "yakin menghapus?",
        text: "data tidak akan dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff0000",
        cancelButtonColor: "#FF00FF",
        confirmButtonText: "Hapus!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await API.delete(`/film/${id}`);
        }
      });
    } catch (err) {
      console.error(err);
    }
  });

  useEffect(() => {
    refetch();
  }, [deleteHandle]);

  return (
    <div style={{ backgroundColor: "black", marginTop: "70px" }}>
      <Container>
        {/* <div className="pt-4 text-white d-flex  align-items-center w-100 ">
          <div>
            <h2 className="pt-4 text-white ">Tv Series</h2>
          </div>
          <div className="pt-4 ms-4 bg-black">
            <select
              value={selectedValue}
              onChange={handleChange}
              className="bg-dark text-white  border-2"
              name="categories"
              id="categories"
            >
              {categories?.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className=" pt-4  w-75">
            <Button
              style={{ float: "right" }}
              variant="btn btn-danger text-white "
              onClick={() => navigate("/add-film")}
            >
              Add Film
            </Button>
            <Button
              style={{ float: "right" }}
              variant="btn btn-danger text-white mx-2 "
              onClick={() => navigate("/add-category")}
            >
              Add Category
            </Button>
            <Button
              style={{ float: "right" }}
              variant="btn btn-danger text-white mx-2 "
              onClick={() => navigate("/add-episode")}
            >
              Add Episode
            </Button>
          </div>
        </div> */}

        <Row>
          <p className="text-white"> List Film</p>
          {films?.map((item, index) => (
            <Col key={index} className="my-4 mt-5 col-12 col-md-2">
              <Card
                style={{
                  width: "200px",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                <Card.Body
                  className="align-items-center"
                  style={{ backgroundColor: "black" }}
                >
                  <Card.Img
                    src={item?.thumbnailfilm}
                    onClick={() => {
                      navigate(`/detail/${item.id}`);
                    }}
                  />
                  <Card.Title
                    style={{ fontSize: "15px" }}
                    className="mt-2 text-white"
                  >
                    {item?.title}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "12px", color: "white" }}>
                    {item?.year}
                  </Card.Text>
                </Card.Body>
                <div className="d-flex bg-black justify-content-center">
                  <Link
                    to={`/updatemovie/${item.id}`}
                    className="btn btn-warning px-4 mx-2 "
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      deleteHandle.mutate(item?.id);
                    }}
                    className="btn btn-danger mx-3"
                  >
                    Delete
                  </button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ListFilm;
