import React from "react";
import "../styles/AdminDashboard.css";
import MkdSDK from "../utils/MkdSDK";
import { useState, useEffect } from "react";
import { AuthContext } from "../authContext";
import { useDrag, useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { NativeTypes } from "react-dnd-html5-backend";
const type = "CARD";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { dispatch: authDispatch } = React.useContext(AuthContext);

  useEffect(() => {
    console.log("here");
    const fetchVideos = async () => {
      let sdk = new MkdSDK();
      const payload = { page: currentPage, limit: 10 };
      const response = await sdk.callRestAPI(payload, "PAGINATE");
      console.log(response);
      setVideos(response.list);
      setTotalPages(response);
    };

    fetchVideos();
  }, [currentPage]);

  const logout = () =>{
    authDispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  }
  const moveCard = (dragIndex, hoverIndex) => {
    const draggedCard = videos[dragIndex];
    const newVideos = [...videos];
    newVideos.splice(dragIndex, 1);
    newVideos.splice(hoverIndex, 0, draggedCard);
    setVideos(newVideos);
  };

  const Card = ({ video, index }) => {
    const [, drag] = useDrag({
      type,
      item: { index },
    });

    const [, drop] = useDrop({
      accept: type,
      hover: (item) => {
        if (item.index !== index) {
          moveCard(item.index, index);
          item.index = index;
        }
      },
    });

    return (
      <div ref={(node) => drag(drop(node))}>
        <div className="board-card">
          <div className="board-card-inner-cont1">
            <p className="board-card-p1">{video.id}</p>
            <div className="board-card-innerd1">
              <img src={video.photo} alt="" />
              <p>{video.title}</p>
            </div>
          </div>
          <div className="board-card-inner-cont2">
            <div className="board-card-innerd2">
              <img src={video.photo} alt="" />
              <p>{video.username}</p>
            </div>
            <div className="board-card-innerd3">
              <p>{video.like}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        <div className="adminDashboard-container">
          <header>
            <nav className="nav">
              <h1>App</h1>
              <button onClick={() => logout()}>
                Logout
              </button>
            </nav>
          </header>
          <div className="board-title-div">
            <p className="board-title"> Today's leaderBoard</p>
            <div className="board-title-date-details">
              <p className="board-title-date">30 May 2020</p>
              <p className="board-title-submission">SUBMISSION OPEN</p>
              <p className="board-title-time">11:34</p>
            </div>
          </div>
          <div className="card-description">
            <div className="card-description-innerd1">
              <p className="card-description-innerd1-p1">#</p>
              <p className="card-description-innerd1-p2">Title</p>
            </div>
            <p className="card-description-p1">Author</p>
            <div>
              <p className="card-description-p2">Most Liked</p>
            </div>
          </div>

          {videos &&
            videos.map((item, index) => (
              <Card key={item.id} index={index} video={item} />
            ))}

          <div className="button-divs">
            <button
              className="button-divs-btn1"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <button
              className="button-divs-btn2"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
