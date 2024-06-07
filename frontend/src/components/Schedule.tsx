import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Definizione dei tipi per gli esami
interface WidgetDetails {
  id: number;
  status: boolean;
  settings: any; //JSON
  user_id: number;
  widget_id: number;
  // Aggiungi altri campi necessari
}

// Definizione del tipo della risposta dell'API
interface TranscriptResponse {
  data: {
    details: WidgetDetails[];
  };
}

const Schedule = () => {
  const [details, setDetails] = useState<WidgetDetails[]>([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get<TranscriptResponse>("/api/widgets")
  //     .then((res) => setDetails(res.data.data.details);
  //     console.log(details)
  //   )
  //     .catch((_err) => navigate("/"));
  // }, []);

  useEffect(() => {
    axios
      .get<TranscriptResponse>("/api/widgets")
      .then((res) => {
        setDetails(res.data.data.details);
        console.log(res.data.data.details); // Sposta il console.log qui se vuoi vedere i dettagli subito
      })
      .catch((_err) => {
        navigate("/");
      });
  }, [navigate]);
  return (
    <div>
      {/* Rendering degli esami */}
      {details.map((detail) => (
        <div key={detail.id}>
          <h3>{detail.status}</h3>
          <p>Score: {detail.settings}</p>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
