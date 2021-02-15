export default {
    apiKey: 'AIzaSyAfiTMJvwFk7jyu9i-1f96a70iT3ZcW9s4',
    spreadsheetId: '1xipBjrcDv68Xlig9Kxt78zv305BNQoV6URJ6QDU_U2Q',
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
}