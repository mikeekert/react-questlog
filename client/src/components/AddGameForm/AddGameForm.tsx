import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchGamesByName } from "../../store/actions/games.actions";
import "./AddGameForm.scss";

function AddGameForm() {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(fetchGamesByName(searchInput));
    };

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchInput(event.currentTarget.value);
    }

    return (
        <div className="AddGameForm">
            <section className="section_8bit">
                <div className="wrapper wrapMenu">
                    <form className="add-form" onSubmit={handleSubmit}>
                        <span className="">SEARCH:</span>
                        <input
                            type="text"
                            className="search"
                            value={searchInput}
                            spellCheck="false"
                            onChange={handleChange}
                        />
                        <button type={"submit"}>ENTER</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default AddGameForm;
