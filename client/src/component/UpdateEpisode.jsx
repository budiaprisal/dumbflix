import Modal from "react-modal";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { API } from "../config/api";
import { useEffect } from "react";

function UpdateEpisodeModal({ isOpen, closeModal }) {
  const [updateEpisode, setUpdateEpisode] = useState({});
  const { id } = useParams();

  function handleSubmit(event) {
    event.preventDefault();
  }

  const [episodeId, setEpisodeId] = useState([]);
  let { data: episodes } = useQuery("episodesCache", async () => {
    const response = await API.get("/episodes");
    return response.data.data;
  });

  useEffect(() => {
    const getform = async () => {
      try {
        const response = await API.get("/film/" + id);
        setEpisodeId({
          title: response.data.data.title,
          linkfilm: response.data.data.linkfilm,
          thumbnailfilm: "",
          year: response.data.data.year,
          category_id: response.data.data.category_id,
          description: response.data.data.description,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getform();
  }, [id]);
  const handleChange = (e) => {
    setUpdateEpisode({
      ...updateEpisode,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const updateButtonHandler = useMutation(async (e) => {
    closeModal();
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      if (updateEpisode.episode_id === "") {
        setUpdateEpisode({ ...updateEpisode, EpisodeID: episodeId[0]?.id });
      }

      const formData = new FormData();
      formData.set("title", updateEpisode.title);
      formData.set("linkfilm", updateEpisode.linkfilm);
      formData.set("film_id", updateEpisode.id);
      formData.set(
        "thumbnailfilm",
        updateEpisode?.thumbnailfilm[0],
        updateEpisode?.thumbnailfilm[0]?.name
      );

      console.log(formData);

      const response = await API.patch(`/episode/${id}`, formData, config);
      console.log("add episode success : ", response);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Edit Episode Success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log("erorr response", error.response);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Edit Episode Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      border: "none",
      borderRadius: "5px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
      padding: "20px",
      background: "black",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Episode Modal"
      style={customStyles}
    >
      <h2
        className="text-white"
        style={{ color: "	GreenYellow", marginBottom: "20px" }}
      >
        Edit Episode detail
      </h2>
      <form onSubmit={(e) => updateButtonHandler.mutate(e)}>
        <div className="form-group">
          <label
            style={{ color: "white", fontSize: "16px", marginBottom: "5px" }}
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="episodeTitle"
            placeholder="Masukan Title"
            name="title"
            onChange={handleChange}
            style={{ borderRadius: "5px", padding: "8px" }}
          />
        </div>
        <div className="form-group">
          <label
            style={{ color: "white", fontSize: "16px", marginBottom: "5px" }}
            htmlFor="episodeLink"
          >
            Thumbnail Film
          </label>
          <input
            type="file"
            className="form-control"
            placeholder="asdas"
            cursor="pointer"
            id="episodeLink"
            name="thumbnailfilm"
            onChange={handleChange}
            style={{ borderRadius: "5px", padding: "8px" }}
          />
        </div>

        <div className="form-group">
          <label
            style={{ color: "white", fontSize: "16px", marginBottom: "5px" }}
            htmlFor="episodeLink"
          >
            Link Film
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukan Link"
            id="episodeLink"
            name="linkfilm"
            onChange={handleChange}
            style={{ borderRadius: "5px", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-danger"
          style={{ marginTop: "20px" }}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
}

export default UpdateEpisodeModal;
