import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import FourthSectioned from "../components/FourthSectioned";
import NewPost from "../components/NewPost";
import DeletePost from "../components/DeletePost";

function CardList() {
  const [showForm, setShowForm] = useState(false);
  const [setDeleteForm, deleteFormMethod] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

function logout() {
  sessionStorage.removeItem("loggedIn","false");
  navigate("/");
}

  function refreshDogs() {
    setRefreshKey((current) => current + 1);
  }

  return (
    <div className="App">
      <div className="addDogArea">
        
          <button className="floatingAddButton" type="button" onClick={logout}>
            Login out
          </button>
      

        <button
          className="floatingAddButton"
          type="button"
          onClick={() => deleteFormMethod(true)}
        >
          <span className="plusIcon">-</span>
          Delete post
        </button>

        <button
          className="floatingAddButton"
          type="button"
          onClick={() => setShowForm(true)}
        >
          <span className="plusIcon">+</span>
          Make new post
        </button>
      </div>

      <FourthSectioned refreshKey={refreshKey} />

      <NewPost
        makePost={showForm}
        makePostMethod={() => setShowForm(false)}
        onPostAdded={refreshDogs}
      />
      {setDeleteForm && (
        <DeletePost
          onClose={() => deleteFormMethod(false)}
          onDeleted={refreshDogs}
        />
      )}
    </div>
  );
}
export default CardList;
