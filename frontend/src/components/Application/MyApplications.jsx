// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../../main";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate,useParams } from "react-router-dom";
// import ResumeModal from "./ResumeModal";

// const MyApplications = () => {
//   const { user } = useContext(Context);
//   const [applications, setApplications] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [resumeImageUrl, setResumeImageUrl] = useState("");

//   const { isAuthorized } = useContext(Context);
//   const navigateTo = useNavigate();


//   useEffect(() => {
//     try {
//       if (user && user.role === "Employer") {
//         axios
//           .get("http://localhost:8000/api/v1/application/employer/getall", {
//             withCredentials: true,
//           })
//           .then((res) => {
//             setApplications(res.data.applications);
//           });
//       } else {
//         axios
//           .get("http://localhost:8000/api/v1/application/jobseeker/getall", {
//             withCredentials: true,
//           })
//           .then((res) => {
//             setApplications(res.data.applications);
//           });
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }, [isAuthorized]);

//   if (!isAuthorized) {
//     navigateTo("/");
//   }

//   const deleteApplication = (id) => {
//     try {
//       axios
//         .delete(`http://localhost:8000/api/v1/application/delete/${id}`, {
//           withCredentials: true,
//         })
//         .then((res) => {
//           toast.success(res.data.message);
//           setApplications((prevApplication) =>
//             prevApplication.filter((application) => application._id !== id)
//           );
//         });
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const openModal = (imageUrl) => {
//     setResumeImageUrl(imageUrl);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <section className="my_applications page">
//       {user && user.role === "Job Seeker" ? (
//         <div className="container">
//           <h1>My Applications</h1>
//           {applications.length <= 0 ? (
//             <>
//               {" "}
//               <h4>No Applications Found</h4>{" "}
//             </>
//           ) : (
//             applications.map((element) => {
//               return (
//                 <JobSeekerCard
//                   element={element}
//                   key={element._id}
//                   deleteApplication={deleteApplication}
//                   openModal={openModal}
//                   user={user}
//                 />
//               );
//             })
//           )}
//         </div>
//       ) : (
//         <div className="container">
//           <h1>Applications From Job Seekers</h1>
//           {applications.length <= 0 ? (
//             <>
//               <h4>No Applications Found</h4>
//             </>
//           ) : (
//             applications.map((element) => {
//               return (
//                 <EmployerCard
//                   element={element}
//                   key={element._id}
//                   openModal={openModal}
//                 />
//               );
//             })
//           )}
//         </div>
//       )}
//       {modalOpen && (
//         <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
//       )}
//     </section>
//   );
// };

// export default MyApplications;

// const JobSeekerCard = ({ element, deleteApplication, openModal, user }) => {
//   return (
//     <>
//       <div className="job_seeker_card">
//         <div className="detail">
//          {/* <p>
//             <span>Apply For:</span> {element?.JOBID}
//           </p> */}
//           <p>
//             <span>Name:</span> {element.name}
//           </p>
//           <p>
//             <span>Email:</span> {element.email}
//           </p>
//           <p>
//             <span>Phone:</span> {element.phone}
//           </p>
//           <p>
//             <span>Address:</span> {element.address}
//           </p>
//           <p>
//             <span>CoverLetter:</span> {element.coverLetter}
//           </p>
//         </div>
//         <div className="resume">
//           <img
//             src={element.resume.url}
//             alt="resume"
//             className="btn"
//             onClick={() => openModal(element.resume.url)}
//           />
//         </div>
//         <div className="btn_area">
//           <button className="btn" onClick={() => deleteApplication(element._id)}>
//             Delete Application
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// const EmployerCard = ({ element, openModal }) => {
//   console.log("ele", element);
//   return (
//     <>
//       <div className="job_seeker_card">
//         <div className="detail">
//           <p>
//             <span>Name:</span> {element.name}
//           </p>
//           <p>
//             <span>Email:</span> {element.email}
//           </p>
//           <p>
//             <span>Phone:</span> {element.phone}
//           </p>
//           <p>
//             <span>Address:</span> {element.address}
//           </p>
//           <p>
//             <span>CoverLetter:</span> {element.coverLetter}
//           </p>
//         </div>
//         <div className="resume">
//           <img
//             src={element.resume.url}
//             alt="resume"
//             onClick={() => openModal(element.resume.url)}
//           />
//         </div>
//       </div>
//     </>
//   );
// };











import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import ConfirmationModal from "./ConfirmationModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();

  const [job, setJob] = useState({});


  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchData = async () => {
      try {
        const endpoint = user.role === "Employer" ?
          "http://localhost:8000/api/v1/application/employer/getall" :
          "http://localhost:8000/api/v1/application/jobseeker/getall";

        const response = await axios.get(endpoint, { withCredentials: true });
        console.log(response.data.applications)
        setApplications(response.data.applications);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [isAuthorized, navigateTo, user.role]);

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/application/delete/${id}`, { withCredentials: true });
      setApplications((prevApplications) => prevApplications.filter((application) => application._id !== id));
      toast.success("Application deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      <div className="container">
        {user.role === "Job Seeker" ? (
          <h1>My Applications</h1>
        ) : (
          <h1>Applications From Job Seekers</h1>
        )}
        {applications.length === 0 ? (
          <h4>No Applications Found</h4>
        ) : (
          applications.map((element) => (
            <ApplicationCard
              key={element._id}
              application={element}
              deleteApplication={deleteApplication}
              openModal={openModal}
            />
          ))
        )}
      </div>
      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
  );
};

const ApplicationCard = ({ application, deleteApplication, openModal }) => {
  // console.log(application);

  const navigateTo = useNavigate();

  const [job, setJob] = useState({});

  const confirmDeleteJob = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this job?');
    if (isConfirmed) {
      deleteApplication(id);
    }
  };
  // const confirmDeleteJob = (id) => {
  //   const [showConfirmationModal, setShowConfirmationModal] = useState(true);
  
  //   const handleConfirm = () => {
  //     deleteApplication(id);
  //     setShowConfirmationModal(false);
  //   };
  
  //   const handleCancel = () => {
  //     setShowConfirmationModal(false);
  //   };
  
  //   return (
  //     <>
  //       {showConfirmationModal && (
  //         <ConfirmationModal
  //           message="Are you sure you want to delete this job?"
  //           onConfirm={handleConfirm}
  //           onCancel={handleCancel}
  //         />
  //       )}
  //     </>
  //   );
  // };  

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/job/${application?.JOBID}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("res", res.data.job.title);
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  return (
    <div className="job_seeker_card">
      <div className="detail">
        <h4><span>Applied for:</span> {job.title}</h4> {/* Display job title here */}
        <p><span>Name:</span> {application.name}</p>
        <p><span>Email:</span> {application.email}</p>
        <p><span>Phone:</span> {application.phone}</p>
        <p><span>Address:</span> {application.address}</p>
        <p><span>CoverLetter:</span> {application.coverLetter}</p>

      </div>
      <div className="resume">
        <img src={application.resume.url} alt="resume" onClick={() => openModal(application.resume.url)} />
      </div>
      <div className="btn_area">
        {/* <button className="btn" onClick={() => deleteApplication(application._id)}>
          Delete Application
        </button> */}
        <button
          onClick={() => confirmDeleteJob(application._id)}
          className="delete_btn btn"
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

export default MyApplications;
