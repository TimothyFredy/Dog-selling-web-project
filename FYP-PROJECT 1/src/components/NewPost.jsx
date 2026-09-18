import { useState } from "react";
import {toast} from "react-toastify"

const API_URL = import.meta.env.VITE_API_URL;

function NewPost({ makePost, makePostMethod,  onPostAdded}) {
  const [name, setName] = useState("");
  const [image_url, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [currency_code, setCurrency_code] = useState("");

  function addPost(event) {
    event.preventDefault();

    const items = {
      name: name,
      imageUrl: image_url,
      details: details,
      price: Number(price),
      currencyCode: currency_code,
    };

    fetch(`${API_URL}/dogs`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(items),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        toast.success("new post was successfully");

        setName("");
        setImage("");
        setDetails("");
        setPrice("");
        setCurrency_code("");

        onPostAdded();

        makePostMethod();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  if (!makePost) {
    return null;
  }

  return (
    <div
      className="modalOverlay"
      onClick={makePostMethod}
    >
      <div
        className="modalBox"
        onClick={(event) => event.stopPropagation()}
      >
        

        <div className="formHeading">
          <h2>Add a New breed</h2>

          <p>
            Enter the dog's information below.
          </p>
        </div>

        <form onSubmit={addPost}>
          <div className="formGroup">
            <label>Dog Name</label>

            <input
              type="text"
              placeholder="e.g. Rottweiler"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              minLength={4}
                            required
            />
          </div>

          <div className="formGroup">
            <label>Image URL</label>

            <input
              type="url"
              placeholder="Enter the image_url"
              value={image_url}
              onChange={(event) =>
                setImage(event.target.value)
              }
              required
            />
          </div>

          <div className="formGroup">
            <label>Description</label>

            <textarea
              placeholder="Enter the dog's description"
              value={details}
              onChange={(event) =>
                setDetails(event.target.value)
              }
              minLength={100}
              maxLength={100}              
              required
            ></textarea>
          </div>

          
            <div className="formGroup">
              <label>Price</label>

              <input
                type="number"
                placeholder="e.g. 600000"
                value={price}
                onChange={(event) =>
                  setPrice(event.target.value) 
                }
                min={1}
                required
              />
            </div>

            <div className="formGroup">
              <label>Currency</label>

              <select
              value={currency_code}
              onChange={(e) => setCurrency_code(e.target.value)}
              required
              >
                <option value =""> Select Currency</option>
                <option value="TZS"> TZS- Tanzanian Shillings</option>
                  <option value="USD"> USD- US dollars</option>
                    <option value="EUR"> EUR- Euro</option>
                    <option value="KZS"> KZS-Kenyan Shillings</option>
              </select>
            </div>
          

          <div className="formButtons">
            <button
              className="cancelButton"
              type="button"
              onClick={makePostMethod}
            >
              Cancel
            </button>

            <button
              className="submitDogButton"
              type="submit"
            >
              Add new breed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPost;