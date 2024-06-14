import { useParams } from "react-router-dom";
import { State } from "../../redux/reducers/userReducer";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { GeneralSettings } from "../../typescript/interfaces";
import { useSelector } from "react-redux";

type Params = {
  settingIndex: string;
};

const MediaEdit: () => JSX.Element = () => {
  const { settingIndex } = useParams<Params>();
  const indexInt: number = settingIndex !== undefined ? parseInt(settingIndex, 10) : 0;

  // GETTING MEDIA DATA FROM REDUX
  const media = useSelector((state: State) => state.widgets.media);

  // CREATING AND MANAGING A LOCAL STATE FOR FUTURE UPDATED DATA
  const [formData, setFormData] = useState<Partial<GeneralSettings>>({});

  const updateInputValue = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitUpdatedData = (ev: FormEvent<HTMLFormElement>, index: number) => {
    ev.preventDefault();
    if (!media || !media.settings) return;

    const updatedSettings = {
      ...media.settings[index],
      ...formData,
      start: formData.start ? new Date(formData.start) : media.settings[index].start,
      finish: formData.finish ? new Date(formData.finish) : media.settings[index].finish,
      deadline: formData.deadline ? new Date(formData.deadline) : media.settings[index].deadline,
    };

    const updatedSettingsArray = [
      ...media.settings.slice(0, index),
      updatedSettings,
      ...media.settings.slice(index + 1),
    ];

    const body = {
      ...media,
      settings: updatedSettingsArray,
    };

    axios
      .put(`http://localhost:8000/api/user/widgets/edit/${media.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  // MANAGING THE DELETE OF A SINGLE ITEM WITHIN THE SETTINGS ARRAY
  const deleteItem = (index: number) => {
    if (!media || !media.settings) return;

    const updatedSettingsArray = [...media.settings.slice(0, index), ...media.settings.slice(index + 1)];

    const body = {
      ...media,
      settings: updatedSettingsArray,
    };

    axios
      .put(`http://localhost:8000/api/user/widgets/edit/${media.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Item deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <>
      <div>
        <h1>Edit media</h1>
        {media && media.settings && media.settings.length > 0 && (
          <form onSubmit={(ev) => submitUpdatedData(ev, indexInt)} noValidate>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={updateInputValue}
              value={formData.title ?? media?.settings?.[indexInt]?.title ?? ""}
            />

            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={updateInputValue}
              value={formData.description ?? media?.settings?.[indexInt]?.description ?? ""}
            />

            <label htmlFor="type" className="form-label">
              type
            </label>
            <input
              type="text"
              className="form-control"
              id="type"
              name="type"
              onChange={updateInputValue}
              value={formData.type ?? media?.settings?.[indexInt]?.type ?? ""}
            />

            <label htmlFor="status" className="form-label">
              status
            </label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              onChange={updateInputValue}
              value={formData.status ?? media?.settings?.[indexInt]?.status ?? ""}
            />

            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
            <button type="button" className="btn btn-danger" onClick={() => deleteItem(indexInt)}>
              Delete
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default MediaEdit;
