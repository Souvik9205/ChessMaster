import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface RoomIdModalProps {
  onClose: () => void;
}

const RoomIdModal: React.FC<RoomIdModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      roomId: "",
    },
    validationSchema: Yup.object({
      roomId: Yup.string().required("Room ID is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const username = localStorage.getItem("username");
        const roomId = values.roomId;
        if (username) {
          localStorage.setItem("roomId", roomId);
          navigate("/game");
        } else {
          toast.error("Please select your username first!", {
            position: "top-right",
          });
        }
        toast.success(`Joining Room: ${values.roomId}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        onClose();
      } catch (error) {
        toast.error("Error joining room. Please try again.", {
          position: "top-right",
        });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl w-96 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">
          Enter Room ID
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Room ID Input */}
          <div>
            <label
              htmlFor="roomId"
              className="block text-sm font-medium text-gray-300"
            >
              Room ID
            </label>
            <input
              type="text"
              name="roomId"
              id="roomId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.roomId}
              className={`mt-1 block w-full px-3 py-2 bg-gray-900/80 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 ${
                formik.touched.roomId && formik.errors.roomId
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.roomId && formik.errors.roomId && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.roomId}
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="py-2 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400"
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomIdModal;
