import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchNote from '../functions/fetchNote';
import updateNote from '../functions/updateNote';

const Home = () => {
   const [note, setNote] = useState("Loading...");
   const [btnText, setBtnText] = useState("Note Saved!");
   const [btnColor, setBtnColor] = useState("success");
   const navigate = useNavigate();

   useEffect(() => {
      if (!localStorage.authToken) {
         const path = "/signup";
         navigate(path);
      }

      const fetchData = async () => {
         try {
            const result = await fetchNote();
            setNote(result);
         } catch (error) {
            console.error("Error fetching note:", error);
         }
      };

      fetchData();
      // eslint-disable-next-line
   }, []);

   const addNote = (e) => {
      e.preventDefault();
      updateNote(note);
      setBtnText("Note Saved!");
      setBtnColor("success");
   };

   const onChange = (e) => {
      setNote(e.target.value);
      setBtnText("Save Note");
      setBtnColor("primary");
   };

   return (
      <form onSubmit={addNote} style={{ margin: "40px 150px" }}>
         <label htmlFor="newNote" className="form-label">
            Note
         </label>
         <textarea className="form-control" id="newNote" value={note} onChange={onChange} rows="6"
         ></textarea>
         <button type="submit" className={`btn btn-${btnColor} my-3`}>{btnText}</button>
      </form>
   );
};

export default Home;
