import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectService from "../../services/ProjectService";


export default class TypeSet extends Component {  

  constructor(props) {
    super(props);
    this.projectService = new ProjectService();
    this.state = {
    //   path: "",
    //   title: "",
    //   colorPalette : null
    }
  }


  render() {
    const {path} = this.props.match.params
    // const {colorPalette}  = this.state

    return (
      <section className="section">
        <div className="container columns">
          <div className="column is-third">
            <div className="side-menu">
              {/* Transform this element in component and pass title through props */}
              <h2 className="title is-1">Typography set</h2>

              <div className="content">
                    <div className="color-palette columns is-multiline">

                      {/* {colorPalette && colorPalette.map((color) => 
                          <div className="column is-full box" key={color._id}>
                            <div className="color">
                            <div className="circle-color" style={{backgroundColor: color.hexadecimal}}></div>
                            <span>{color.name}</span>
                            </div>
                            <div className="is-grouped">
                            <Link to={`/project/${path}/edit/colorPalette/new/${color._id}`} className="button is-rounded is-small is-success is-outlined">Edit</Link>
                            <button onClick={() => this.deleteColor(color._id)} className="button is-rounded is-small is-danger is-outlined">Delete</button>
                            </div>
                          </div>
                      )}
                      
                      {!colorPalette && (
                        <div>You dont have any colorPalette yet</div>
                      )} */}
               
                    </div>

                    <div className="control">
                        <Link to={`/project/${path}/edit/typeSet/new`} className="button is-link">
                        Add Google Font
                        </Link>
                    </div>
              </div>

            </div>
          </div>
          <div className="column is-two-thirds projects-wrapper"></div>
        </div>
      </section>
    );
  }
}
