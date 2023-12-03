import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  // UPDATIND/EDITITNG PREVIOUS DATA

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("please fill in all the fields correctly!");
      return;
    }

    const { data, error } = await supabase
      .from("recipes")
      .update([{ title, method, rating }])
      .eq("id", id)
      .select();

    if (error) {
      setFormError("please fill in all the fields correctly!");
    }
    if (data) {
      setFormError(null);
      navigate("/");
    }
  };

  // UPDATIND/EDITITNG PREVIOUS DATA
  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setRating(data.rating);
        setMethod(data.method);
      }
    };
    fetchSmoothies();
  }, [id, navigate]);

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method: </label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating: </label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
