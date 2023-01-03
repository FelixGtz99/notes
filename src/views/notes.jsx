import React, { Component } from "react";
import Note from "../components/note";
import '../css/notes.css'
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      data: "",
      notes: JSON.parse(localStorage.getItem("notes")) ?? [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.onRemove = this.onRemove.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  saveNote() {
    if (this.state.title === "" || this.state.data === "") return;
    const note = {
      id: this.state.notes[this.state.notes.length-1].id+1,
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
  onRemove(id) {
    const tempNotes = this.state.notes.filter((note) => note.id !== id);
    this.setState({
      notes: tempNotes,
    });

    localStorage.setItem("notes", JSON.stringify(tempNotes));
  }
  render() {
    return (
        <center>
  <main>
        <section id="new-note">
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
        </section>
        <section id="notes-list">
          {this.state.notes.map((note) => (
            <Note note={note} onRemove={()=>this.onRemove(note.id)} />
          ))}
        </section>
      </main>
        </center>
    
    );
  }
}

export default Notes;
