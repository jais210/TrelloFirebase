class Model {
  constructor() {
    this.Comments = [];
    this.inputName = null;
    this.inputComent = null;
    this.callback = null;
  }  
 suscribe(render) {
    this.callback = render;
  }

  notify() {
    this.callback();
  }

  addComments() {
    this.Comments.push({
      name:this.inputName.value,
      comment : this.inputComent.value,
      id: Utils.id(),
    });
    this.notify();
    this.inputName.value = "";
    this.inputComent.value = "";
  }
  delete(e) {
    this.Comments = this.Comments.filter(item => item != e);
    this.notify();
  }
}
const Header = ({ model }) => {
  return (
    <div>
    <div className="caja">
        <h3> NEW COMMENT </h3>
        <form onSubmit={e => {e.preventDefault(); model.addComments(e); }}>
            <input type = "text" name = "name" placeholder = "add name" 
              onChange = {e => (model.inputName = e.target)} /><br/>
            <input type = "text" name = "comment"  placeholder = "add comments" 
              onChange = {e => (model.inputComent = e.target)} /><br/>
            <button type="submit" name="submit" value="submit">POST COMMENT</button>
        </form>
        </div>
      <div>
        <h4>COMMENTS</h4>
          <p className="contador">{model.Comments.length} Comments:</p>
          <ul>{model.Comments.map(item => <CreateLista key = {item.id} newComments={item} model={model} />)}</ul>
      
      </div>
    
    </div>
  );
}

const CreateLista = ({ newComments, model }) => {
  return (
    <div className="result">
       <div className="foto"><img src="https://s.ytimg.com/yts/img/avatar_48-vfllY0UTT.png" alt=""/></div>
          <div className="comentario">
           <li>
              <h4 className="name">{newComments.name}</h4>
              <p>{newComments.comment}</p>
          </li>
        </div>
        <button onClick={() => model.delete(newComments)}><a>DeleteComment</a></button>
          <a href="">Report as abuse</a>
    </div>
  );
}

let model = new Model();
let render = () => {
  ReactDOM.render(
    <Header title = "Register Comments" model={model} />,
    document.getElementById('container')
  );
};

model.suscribe(render);
render(); 
