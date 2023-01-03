import '../css/notes.css'

function Note(props){
return(
    <div id="note-container">
        <button id="remove-button" onClick={props.onRemove}>Remove</button>

        <h3>{props.note.title}</h3>
        <p>
        {props.note.data}
        </p>
    </div>
)

}


export default Note;