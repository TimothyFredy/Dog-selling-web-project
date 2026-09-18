import { useState } from "react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function DeletePost({ onClose,onDeleted }) {
  const [id, setId] = useState("");

  function deletePost(event) {
    event.preventDefault();

    fetch(`${API_URL}/dogs/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        toast.success("Post deletion was successfully");

        setId("");

    onDeleted();
        onClose();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="modalOverlay">

      <div className="deleteModal">

        <h2>Delete a breed</h2>

        <p>Enter the ID of the dog you want to delete.</p>

        <form onSubmit={deletePost}>

          <div className="deleteInputGroup">
            <label>Dog ID</label>

            <input
              type="number"
              placeholder="e.g. 5"
              value={id}
              onChange={(event) => setId(event.target.value)}
              required
            />
          </div>

          <div className="deleteButtons">

            <button
              type="button"
              className="cancelDelete"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="confirmDelete"
            >
              Delete breed
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default DeletePost;