import {  useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import ContentContainer from "./ContentContainer";
import Slots from "./Slots";
import data from './data/data'
import axios from "axios";
import { toast} from "react-toastify";
import LastBooking from "./LastBooking";
import { Seats } from "./Seats";

export default function Cards(props) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:8080",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast("", {
            
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

//   const refreshPage = ()=>{
//     window.location.reload();
//  };
// (() => {
//             if (window.localStorage) {
  
//                 // If there is no item as 'reload'
//                 // in localstorage then create one &
//                 // reload the page
//                 if (!localStorage.getItem('reload')) {
//                     localStorage['reload'] = true;
//                     window.location.reload();
//                 } else {
  
//                     // If there exists a 'reload' item
//                     // then clear the 'reload' item in
//                     // local storage
//                     localStorage.removeItem('reload');
//                 }
//             }
//         })();
        const [movieData, setmovieData] = useState({
          movie: "",
          timeSlot: "",
          seat: [],
        });
      
        const [fetchedData, setfetchedData] = useState([]);
      
        // requiring the data provided by almabetter for our app
        const { movies, slots, seats } = data;
      
        // this function collects the seats data and updates the state
        const handleSeats = (seatData) => {
          const findSeat = movieData.seat.findIndex(
            (el) => el.seatName === seatData.seatName
          );
      
          if (findSeat !== -1) {
            const newSeatData = [...movieData.seat];
            newSeatData[findSeat] = seatData;
            setmovieData((prev) => {
              return {
                ...prev,
                seat: newSeatData,
              };
            });
          } else {
            setmovieData((prev) => {
              return {
                ...prev,
                seat: [...prev.seat, seatData],
              };
            });
          }
        };
      
        // this functions tells us to clear the db
        
      
        // this function fetches the last booking and update the state for displaying of it
        const getData = async () => {
          return fetch("http://127.0.0.1:8080/api/booking")
            .then((data) => data.json())
            .then((data) => setfetchedData(data))
            .catch((err) => console.log(err));
        };
      
        // this function sends the collected state to the db and updates it further gives a response of the last booking
        const handelPost = async (data) => {
          return fetch("http://127.0.0.1:8080/api/booking", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((res) => {
              return res.json();
            })
      
            .then((data) => {
              return setfetchedData(data);
            })
      
            .catch((err) => console.log(err));
        };
      
        // this will run when the component will mount and update the state ultimately setting up the state to show the last booking
        useEffect(() => {
          getData();
        }, []);
      
        // these functions updates the state
        const handleMovie = (selectedMovie) => {
          setmovieData((prev) => {
            return {
              ...prev,
              movie: selectedMovie,
            };
          });
        };
      
        const handleTime = (selectedTime) => {
          setmovieData((prev) => {
            return {
              ...prev,
              timeSlot: selectedTime,
            };
          });
        };
        // ///////////////////////////////////
        // this function handle the submit event which will send data to the server
        const handleSubmit = () => {
          const { movie, seat, timeSlot } = movieData;
          if (movie === "" || timeSlot === "" || seat.length <= 0) {
            alert("Please select every field to continue further");
            return;
          }
          return handelPost(movieData);
        };
      
  return (
    <>
      <div className="container">
          <div className="row">
            <div className="col-sm">
          <ContentContainer label={"Recommended Movies"}>
            {movies.map((el,i) => (
              <Slots
                label={el}
                cb={handleMovie}
                key={i}
                movieData={movieData.movie}
              />
            ))}
          </ContentContainer>

          <ContentContainer  label={"  Choose your Time "}>
            {slots.map((el,i) => (
              <Slots
                label={el}
                key={i}
                movieData={movieData.timeSlot}
                cb={handleTime}
              />
            ))}
          </ContentContainer>

          <ContentContainer label={"Choose your Seats"}>
            <Seats seats={seats} cb={handleSeats} data={fetchedData}  />
          </ContentContainer>

          <div className="d-grid gap-2 col-6 mx-auto mt-5">
            <button className="btn btn-success" onClick={handleSubmit}>Submit!</button>

            
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <LastBooking data={fetchedData} />
        </div>
      </div>
    </div>
      <div className="d-grid gap-2 col-6 mx-auto mt-5 mb-4">
  <button className="btn" style={{ backgroundColor: "#C1163A", color: "white" }} onClick={logOut} type="button">LogOut</button>
  {/* <button className="btn" style={{ backgroundColor: "white", color: "white" }} onClick={refreshPage} type="button">LogOut</button> */}


</div>
      
    </>
  );
}
