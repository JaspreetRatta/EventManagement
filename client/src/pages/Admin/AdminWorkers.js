import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import WorkerForm from "../../components/WorkerForm";
import PageTitle from "../../components/PageTitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";

function AdminWorkers() {
  const dispatch = useDispatch();
  const [showWorkerForm, setShowWorkerForm] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [workers, setWorkers] = useState([]);

  // Fetch all workers
  const getWorkers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/workers/get-all-workers", {});
      dispatch(HideLoading());
      if (response.data.success) {
        setWorkers(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // Delete a worker
  const deleteWorker = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/workers/delete-worker", {
        _id: id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getWorkers();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // Columns for the workers table
  const columns = [
    {
      title: "Name",
      dataIndex: "workerName",
    },
    {
      title: "Email",
      dataIndex: "workerEmail",
    },
    {
      title: "Contact Number",
      dataIndex: "workerContactNumber",
    },
    {
      title: "Position",
      dataIndex: "workerPosition",
    },

    
  
    {
      title: "Profile Picture",
      dataIndex: "profilePicture",
      render: (url) => <img src={url} alt="Profile" style={{ width: 50, height: 50 }} />,
    },
    
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              deleteWorker(record._id);
            }}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => {
              setSelectedWorker(record);
              setShowWorkerForm(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getWorkers();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <PageTitle title="Workers" />
        <button className="primary-btn" onClick={() => setShowWorkerForm(true)}>
          Add Worker
        </button>
      </div>

      <Table columns={columns} dataSource={workers} rowKey="_id" />

      {showWorkerForm && (
        <WorkerForm
          showWorkerForm={showWorkerForm}
          setShowWorkerForm={setShowWorkerForm}
          type={selectedWorker ? "edit" : "add"}
          selectedWorker={selectedWorker}
          setSelectedWorker={setSelectedWorker}
          getData={getWorkers}
        />
      )}
    </div>
  );
}

export default AdminWorkers;
