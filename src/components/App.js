import React, { Component } from "react";
import { Container, Nav } from "./styled-components";

// fusioncharts
import Chart from 'react-apexcharts'
// import "./charts-theme";

import config from "./config";
import UserImg from "../assets/images/wp.jpg";

const url = `https://sheets.googleapis.com/v4/spreadsheets/${
  config.spreadsheetId
}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      tableData:[],
      options: [],
      series: []
    };
  }

  async componentDidMount() {
    const notionTableData = await fetch(
      "https://notion-api.splitbee.io/v1/table/df4fb5a193c0420d903a19e19b594851"
    ).then(res => res.json());  
    this.setState({
      tableData: notionTableData,
      options: config.options
    });
  }
  render() {
    return (
      <Container>
        {/* static navbar - top */}
        <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
          <Container className="navbar-brand h1 mb-0 text-large font-medium">
            Workpal Implementation Dashboard
          </Container>
          <Container className="navbar-nav ml-auto">
            <Container className="user-detail-section">
              <span className="img-container">
                <img src={UserImg} className="rounded-circle" alt="user" />
              </span>
            </Container>
          </Container>
        </Nav>

        {/* content area start */}
        <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
          {/* row 1 - revenue */}
          <Container className="row">
            <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Calls this week
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">
                  {this.state.tableData.length}
                  <span className="text-medium pl-2 is-dark-text-light">
                    calls
                  </span>
                </Container>
              </Container>
            </Container>

            <Container className="col-md-8 col-lg-9 is-light-text mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="row full-height">
                
                      <table className="table">
                        <thead>
                          <tr className="is-dark-text-light letter-spacing text-small">
                            <th>Client</th>
                            <th>Subject</th>
                            <th>Agent</th>
                            <th>Progress</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.tableData.map((call,index) => {
                              return (
                                <tr >
                                  <td>{call.Client}</td>
                                  <td>{call.Subject}</td>
                                  <td>{call.Agent}</td>
                                  <td>
                                    <div >
                                      <Chart
                                        options={this.state.options}
                                        series={[call.Progress]}
                                        type="radialBar"
                                        height="100px"
                                        width="100px"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                      {/* <Table data={this.state.items}/> */}
                </Container>
              </Container>
            </Container>
        </Container>
      </Container>
    </Container>
    );
  }
}

export default App;
