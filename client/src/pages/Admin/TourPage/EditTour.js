import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { axiosInstance } from "../../../helpers/axiosInstance";
import { Col, Form, message, Modal, Row } from "antd";
import { useDispatch } from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { HideLoading, ShowLoading } from "../../../redux/alertsSlice";

const initialstate = {
  title: "TourTest1",
  journeyDate: "2023-11-01",
  price: "15000",
  description: "Description Test",
  duration: 12,
  details: "Details Test",
  images: [],
};

const CreateTour = ({
  showBusForm,
  setShowBusForm,
  getTour,
  selectedBus,
  setSelectedBus,
}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(selectedBus);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleChangeQuill = (content) => {
    setValues({ ...values, details: content });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    dispatch(ShowLoading());
    axiosInstance
      .post("/api/tour/update", {
        ...values,
        _id: selectedBus._id,
      })
      .then((res) => {
        dispatch(HideLoading());
        console.log(res);
        getTour();
        setShowBusForm(false);
        setSelectedBus(null);
      })
      .catch((err) => {
        dispatch(HideLoading());
        console.log(err.response);
        getTour();
      });
  };

  return (
    <Modal
      width={800}
      title="Update Tour"
      visible={showBusForm}
      onCancel={() => {
        setSelectedBus(null);
        setShowBusForm(false);
      }}
      footer={false}
    >
      <div className="col">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              className="form-control"
              type="date"
              name="journeyDate"
              value={values.journeyDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>price</label>
            <input
              className="form-control"
              type="number"
              name="price"
              value={values.price}
              onChange={handleChange}
            />
            
          <Col lg={12} xs={24}>
            <Form.Item label="Status" name="eventStatus">
              <select name="" id="">
                <option value="Yet To Start">Yet To Start</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>
            </Form.Item>
          </Col>
       
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Duration</label>
            <input
              className="form-control"
              type="number"
              name="duration"
              value={values.duration}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>details</label>
            <ReactQuill 
              value={values.details} 
              onChange={handleChangeQuill}
            />
        
          </div>

      
          <label>Images</label>
          <FileUpload values={values} setValues={setValues} />

          <div className="d-flex justify-content-end">
            <button className="primary-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTour;

