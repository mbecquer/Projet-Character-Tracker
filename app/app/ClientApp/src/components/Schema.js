import React, { Component } from "react";
import { ModificationSchema } from "../pages/ModificationSchema";

import "./Schema.css";
export class Schema extends Component {
  static displayName = Schema.name;

  constructor(props) {
    super(props);
    this.state = { schema: [], loading: true, nodes: [] };
  }
  async getSchema() {
    const response = await fetch(
      `api/schema/${this.props.match.params.id}`
    ).then((res) => res.json());
    // console.log(response);
    this.setState({ schema: response, loading: false });
  }
  async getPersonage() {
    const listPersonage = await fetch("api/personage").then((res) =>
      res.json()
    );

    // console.log(listPersonage);
    this.setState({ nodes: listPersonage });
  }

  async componentDidMount() {
    await this.getPersonage();
    await this.getSchema();
  }
  render() {
    return (
      <div>
        <div className="container">
          <h3 className="d-flex justify-content-center p-3">
            Schema {this.state.schema.name}
          </h3>
          <p className="d-flex justify-content-center ">
            {this.state.schema.desc}
          </p>

          {/* <div className="col-md-3 border p-3">
          
              <ModificationSchema />
            </div> */}

          <div className="container-card">
            {/* card */}
            {this.state.nodes.map((n) => (
              <div className="col my-card" key={n.id}>
                <div className="head-card">
                  <img src="https://picsum.photos/200" />
                </div>

                <div className="body-card">
                  <h5 className=" text-uppercase text-primary">{n.lastname}</h5>
                  <h6 className="text-capitalize card-subtitle text-muted mb-2">
                    {n.firstname}
                  </h6>

                  <p className="">gender: {n.gender}</p>
                  <p className="">birthdate: {n.birthdate}</p>
                  <p className="">deathdate: {n.deathdate}</p>
                </div>
              </div>
            ))}
            <div
              data-toggle="modal"
              data-target="#exampleModal"
              className="add-card"
            >
              +
            </div>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Creation personage
                    </h5>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                  <div className="modal-body">
                    <ModificationSchema schema={this.state.schema.id} />
                  </div>
                </div>
              </div>
            </div>
            {/* card */}
          </div>
        </div>
      </div>
    );
  }
}
