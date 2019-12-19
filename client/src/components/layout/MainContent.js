import React, { Component } from 'react';
import ProjectService from '../../services/ProjectService';
import { Content } from '../project/Content';
import Dropdown from '../utils/Dropdown';
import Dropzone from 'react-dropzone';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.projectService = new ProjectService();
  }

  displayRows = () => {
    const {id} = this.props.match.params

    this.projectService.displayRows(id)
    .then(rows => {
      this.setState({
        ...this.state,
        rows: rows
      });
    });
  };

  addNewRow = layout => {
    const userId = this.props.user.id;
    this.projectService.createNewRow({ layout, userId }).then(
      projectWithRowAdded => {
        this.setState({
          ...this.state,
          rows: projectWithRowAdded.rows
        });
      },
      error => console.log(error)
    );
  };

   deleteRow = rowId => {
    this.projectService.deleteRow(rowId)
    .then(
      project => {
        console.log(project)
        this.displayRows()
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  addContent = (rowId, slotIdx, type) => {
    this.projectService.addContent({ rowId, slotIdx, type }).then(payload => {
      this.displayRows();
    });
  };

  addFontAsContent = (rowId, slotIdx, type) => {
    this.projectService.addFontAsContent({ rowId, slotIdx, type }).then(payload => {
      console.log(payload)
      // this.displayRows();
    });
  };

  componentDidMount() {
    this.displayRows();
  }

  render() {
    const path = this.props.user.activeProject;
    const { colorPalette, typeset, assets } = this.props;

    return (
      <div
        className={`main-content section is-paddingless	 ${this.props.menuIsOpen}`}
      >
        <section className='section rows-container is-paddingless	'>
          {this.state.rows &&
            this.state.rows.map((row, rowIdx) => (
              <div key={row._id} className='columns is-multiline is-marginless'>
                {row.slots.map((slot, slotIdx) => (
                  <div
                    key={slotIdx}
                    id={`slot-${rowIdx}-${slotIdx}`}
                    className={`${row.layout} column row slot`}
                  >
                    {row.content[slotIdx] && (
                      <React.Fragment>

                        {row.content[slotIdx].type === 'assets' && (
                          <>
                          {assets &&
                            <React.Fragment>
                            <div className="droppable"
                            onDrop={(e, slotIdx) => this.props.onDrop(e, slotIdx)}
                            >
                              <section class='file-label'>
                                <div >
                                  <p>
                                    Drag 'n' drop some files here, or click to select files
                                  </p>
                                </div>
                              </section>
                            </div>
                            </React.Fragment>
                          }

                          {!assets.length && (
                            <div>
                              Add your first asset.
                              <a
                                href={`/project/${path}/edit/assets`}
                              >
                                New asset
                              </a>
                            </div>
                          )}
                        </>
                        )}

                        {row.content[slotIdx].type === 'colorPalette' && (
                          <>
                          {colorPalette &&
                            <div className="color-container">
                            {colorPalette.map((color, idx) => (
                                <div className='color' key={idx}
                              style={{
                                width: 100/colorPalette.length + "%",
                                backgroundColor: color.hexadecimal
                              }}
                              >
                                <span class="color-name vertical-text">{color.name}</span>
                              </div>
                            ))}</div>}
                              

                          {!colorPalette.length && (
                            <div className="color-container">
                            <div>
                              Add your first color.
                              <a
                                href={`/project/${path}/edit/colorPalette/new`}
                              >
                                New color
                              </a>
                            </div>
                          </div>)}
                        </>
                        )}
                        {row.content[slotIdx].type === 'typeset' && (
                           <>
                           <div className="field has-addons">
                           {typeset &&
                             typeset.map(type => 
                              <p className="control">
                                <button className="button is-small" onClick={slodIdx => this.addFontAsContent(row._id, slotIdx, 'typeset')} style={{fontFamily: type.fontFamily}}>{type.fontFamily}</button>
                              </p>
                             )
                           }
                           </div>

                           {!typeset.length && (
                             <div>
                               Add your first type.
                               <a
                                 href={`/project/${path}/edit/typeset`}
                               >
                                 New type
                               </a>
                             </div>
                           )}
                         </>
                        )}
                      </React.Fragment>
                    )}

                    {!row.content[slotIdx] && (
                      <React.Fragment>
                        <div className="field has-addons">
                        <p className="control">
                        <button className="button is-small" onClick={slodIdx => this.addContent(row._id, slotIdx, 'colorPalette') } >
                          Color Palette
                        </button>
                        </p>
                        <p className="control">
                        <button className="button is-small" onClick={slodIdx => this.addContent(row._id, slotIdx, 'typeset')} >
                          Typography
                        </button>
                        </p>

                        <p className="control">
                        <button className="button is-small" onClick={slodIdx => this.addContent(row._id, slotIdx, 'assets')} >
                          Image
                        </button>
                        </p>
                        </div>


                      </React.Fragment>
                    )}
                  </div>
                ))}

                <button
                  className='close'
                  onClick={() => this.deleteRow(row._id)}
                >
                  Cerrar
                </button>
              </div>
            ))}

          <div className='column is-full layout-btn-container'>
            <a className='header'>Add new row</a>
            <div className='inner'>
              <div
                className='layout-btn'
                onClick={() => this.addNewRow('is-full')}
              >
                <img src={`${process.env.REACT_APP_URL}/full.svg`}></img>
                Full
              </div>

              <div
                className='layout-btn'
                onClick={() => this.addNewRow('is-half')}
              >
                <img src={`${process.env.REACT_APP_URL}/half.svg`}></img>
                Half
              </div>

              <div
                className='layout-btn'
                onClick={() => this.addNewRow('is-one-third')}
              >
                <img src={`${process.env.REACT_APP_URL}/third.svg`}></img>
                Third
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
