import React from "react";
import { Col, Form, message, Modal, Row } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";


function WorkerForm({
  showWorkerForm,
  setShowWorkerForm,
  type = "add",
  getData,
  selectedWorker,
  setSelectedWorker,
}) {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "add") {
        response = await axiosInstance.post("/api/workers/add-worker", values);
      } else {
        response = await axiosInstance.post("/api/workers/update-worker", {
          ...values,
          _id: selectedWorker._id,
        });
      }
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      getData();
      setShowWorkerForm(false);
      setSelectedWorker(null);

      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };



  return (
    <Modal
      width={800}
      title={type === "add" ? "Add Worker" : "Update Worker"}
      visible={showWorkerForm}
      onCancel={() => {
        setSelectedWorker(null);
        setShowWorkerForm(false);
      }}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedWorker}>
        <Row gutter={[10, 10]}>
          <Col lg={12} xs={24}>
            <Form.Item label="Worker Name" name="workerName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Email" name="workerEmail">
              <input type="email" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Contact Number" name="workerContactNumber">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Position" name="workerPosition">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Admin Status" name="adminStatus">
              <select>
                <option value={true}>Admin</option>
                <option value={false}>Not Admin</option>
              </select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Blocked Status" name="blockedStatus">
              <select>
                <option value={true}>Blocked</option>
                <option value={false}>Not Blocked</option>
              </select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Profile Picture" name="profilePicture">
              <input type="text" placeholder="URL or path to profile picture" />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <button className="primary-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default WorkerForm;
