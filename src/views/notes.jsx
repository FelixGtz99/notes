import React, { Component } from "react";
import Note from "../components/note";
import "../css/notes.css";
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      data: "",
      notes: JSON.parse(localStorage.getItem("notes")) ?? [],
      selectedNote: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.selectHandle = this.selectHandle.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  saveNote() {
    if (this.state.title === "" || this.state.data === "") return;
    const note = {
      id: this.state.notes[this.state.notes.length - 1].id + 1,
      title: this.state.title,
      data: this.state.data,
    };
    const tempNotes = [...this.state.notes, note];
    this.setState({
      title: "",
      data: "",
      notes: tempNotes,
    });
    localStorage.setItem("notes", JSON.stringify(tempNotes));
  }

  selectHandle(event) {
    const id = event.target.getAttribute("name");
    const selectedNote = this.state.notes.find(
      (note) => note.id === Number(id)
    );
    console.log(selectedNote);
    this.setState({
      selectedNote
    })
  }
  onRemove(id) {
    const tempNotes = this.state.notes.filter((note) => note.id !== id);
    this.setState({
      notes: tempNotes,
    });

    localStorage.setItem("notes", JSON.stringify(tempNotes));
  }

  render() {
    return (
      <main>
        {/* <section id="new-note">
          <h1>Notes</h1>
          <input
            type="text"
            id="text-title"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
          />{" "}
          <br />
          <textarea
            name="data"
            id="text-data"
            cols="30"
            rows="10"
            onChange={this.handleChange}
            value={this.state.data}
          ></textarea><br />
          <button onClick={this.saveNote} id='save-button'>Save</button>
        </section> */}
        <section id="notes-list">
          {this.state.notes.map((note) => (
            <div
              className="list-item"
              name={note.id}
              onClick={this.selectHandle}
            >
              <h3 name={note.id}>{note.title}</h3>
            </div>
          ))}
        </section>
        <div className="divider"></div>
        <section id="notes-display">
          {this.state.selectedNote !== null ? (
            <Note
              note={this.state.selectedNote}
              onRemove={() => this.onRemove(this.selectedNote.id)}
            />
          ) : (
            ""
          )}
        </section>
      </main>
    );
  }
}

export default Notes;
