import { useParams } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { Container, NavLink } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import { FaPlus, FaRegEdit, FaPlay } from "react-icons/fa";
import { useState } from "react";
import AddEpisodeModal from "./AddEpisode";
import ReactPlayer from "react-player";
import UpdateEpisodeModal from "./UpdateEpisode";

export default function Details(props) {
  // const { IsLogin, user } = props;
  const { id } = useParams();

  // modal state and functions
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenn, setModalIsOpenn] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function openUpdateModal() {
    setModalIsOpenn(true);
  }
  function closeUpdateModal() {
    setModalIsOpenn(false);
  }

  // Fetching product data from database
  let { data: films } = useQuery("filmDetailCache", async () => {
    const response = await API.get(`/film/${id}`);
    return response.data.data;
  });
  let { data: episode } = useQuery("episode", async () => {
    const response = await API.get(`/film/${id}/episode`);
    return response.data.data;
  });
  console.log("episode", films);
  return (
    <>
      <div>
        <Container className="justify-content-center pt-5 mt-4">
          <div>
            <iframe
              width="100%"
              height="720"
              src={films?.linkfilm}
              alt="Video"
              allowFullScreen
              title="111"
            />
          </div>
          <div className="row mt-4">
            <div className="col-md-2 col-6 mb-3">
              <img
                className="rounded"
                src={films?.thumbnailfilm}
                width="200px"
                height="300px"
                style={{ objectFit: "cover" }}
                alt="Card"
              />
            </div>
            <div className="col-md-5 col-6 px-md-5">
              <h2 className="fw-bold text-light mt-3">{films?.title}</h2>
              <div className="d-flex gap-3">
                <p className="text-secondary fw-lighter ">{films?.year}</p>
                <p className="text-secondary fw-lighter border rounded pe-3 ps-3 mb-3">
                  {films?.category.name}
                </p>
              </div>
              <p className="text-light" style={{ textAlign: "justify" }}>
                {films?.description}
              </p>
            </div>
            <div className="col-md-5">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {episode?.map((data, i) => (
                  <SwiperSlide key={i}>
                    <div className="carousel-item active">
                      <ReactPlayer
                        url={data?.linkfilm}
                        light={data?.thumbnailfilm}
                        width={500}
                        height={300}
                      />
                      <p className="text-center mt-2 text-light">
                        {data.title}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="d-flex gap-4">
                <button onClick={openModal} className="btn btn-success btn-sm">
                  Add Episode
                </button>
                <button
                  onClick={openUpdateModal}
                  className="btn btn-warning btn-sm"
                >
                  Edit Episode
                </button>
              </div>
            </div>
          </div>
        </Container>
        <UpdateEpisodeModal
          isOpen={modalIsOpenn}
          closeModal={closeUpdateModal}
        />
        <AddEpisodeModal isOpen={modalIsOpen} closeModal={closeModal} />
      </div>
    </>
  );
}
