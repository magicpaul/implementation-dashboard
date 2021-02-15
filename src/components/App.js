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
      items: [],
      options: [],
      series: []
    };
  }

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        let totalCalls = rows.length;
        // setting state
        console.log(rows);
        this.setState({
            items: rows,
            totalCalls: totalCalls,
            options: {
              colors: [function({ value, seriesIndex, w }) {
                if (value > 66) {
                    return '#38e6a4'
                } else if (value > 33) {
                    return '#febb44'
                }
                else{
                    return '#ff6077'
                }
              }],
              plotOptions: {
                radialBar: {
                  hollow: {
                    margin:15,
                    size: "10%"
                  },
                  track:{
                    opacity:0.3
                  },
                  dataLabels: {
                    showOn: "always",
                    name: {
                      show: false,
                    },
                    value: {
                      show: false
                    }
                  }
                }
              },
            
              stroke: {
                lineCap: "butt",
              }
          }
        });
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
                  {this.state.totalCalls}
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
                            this.state.items.map(call => {
                              return (
                                <tr className = {call.calls_complete}>
                                  <td>{call.calls_client}</td>
                                  <td>{call.calls_subject}</td>
                                  <td>{call.calls_agent}</td>
                                  <td>
                                    <div >
                                      <Chart
                                        options={this.state.options}
                                        series={[call.calls_progress]}
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
