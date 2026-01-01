import { Link } from 'react-router'
import { useResults } from '../context/ResultsContext'
import Plot from 'react-plotly.js'

const Results = () => {
  const { results } = useResults();

  // Redirect if no results
  if (!results) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">No results to display</h2>
          <Link to="/" className="text-[#09348F] hover:text-[#5171b5]">
            Go back to upload
          </Link>
        </div>
      </div>
    );
  }

  // Parse chart JSON strings
  const distanceHistData = JSON.parse(results.charts.distanceHist);
  const paceDistribData = JSON.parse(results.charts.paceDistrib);
  const monthDistribData = JSON.parse(results.charts.monthDistrib);
  const pieData = JSON.parse(results.charts.pie);

  return (
    <div className="min-h-screen bg-white py-8">
      {/* Back Button */}
      <div className="text-center my-8">
        <Link to="/" className="text-[#09348F] hover:text-[#5171b5] text-base">
          BACK
        </Link>
      </div>

      {/* Table of Contents */}
      <div className="text-center text-xs leading-6 mb-8">
        <div className="font-bold mb-2">Table of Contents</div>
        <ul className="list-none p-0 m-0">
          <li><a href="#table-total" className="text-[#09348F] hover:text-[#5171b5]">Overall Statistics</a></li>
          <li><a href="#table-yearly" className="text-[#09348F] hover:text-[#5171b5]">Statistics by Year</a></li>
          <li><a href="#hist-dist" className="text-[#09348F] hover:text-[#5171b5]">Distance Distribution</a></li>
          <li><a href="#hist-pace" className="text-[#09348F] hover:text-[#5171b5]">Pace Distribution</a></li>
          <li><a href="#bar-num-runs" className="text-[#09348F] hover:text-[#5171b5]">Monthly Run Distribution</a></li>
          <li><a href="#pie-dist" className="text-[#09348F] hover:text-[#5171b5]">Distance Class Distribution</a></li>
        </ul>
      </div>

      {/* Overall Statistics Table */}
      <div className="mb-8 flex flex-col items-center" id="table-total">
        <h2 className="text-lg font-medium mb-4">Overall Statistics</h2>
        <table className="border-collapse my-2 text-base">
          <thead>
            <tr className="bg-[#2362b5] text-left text-white">
              <th className="py-3 px-4">Activities</th>
              <th className="py-3 px-4">Distance (mi)</th>
              <th className="py-3 px-4">Moving Time (hr)</th>
              <th className="py-3 px-4">Elevation Gain (ft)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#dddddd]">
              <td className="py-3 px-4">{results.totalSummary.Activities}</td>
              <td className="py-3 px-4">{results.totalSummary['Distance (mi)']}</td>
              <td className="py-3 px-4">{results.totalSummary['Moving Time (hr)']}</td>
              <td className="py-3 px-4">{results.totalSummary['Elevation Gain (ft)']}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Yearly Statistics Table */}
      <div className="mb-8 flex flex-col items-center" id="table-yearly">
        <h2 className="text-lg font-medium mb-4">Statistics by Year</h2>
        <table className="border-collapse my-2 text-base">
          <thead>
            <tr className="bg-[#2362b5] text-left text-white">
              <th className="py-3 px-4">Year</th>
              <th className="py-3 px-4">Activities</th>
              <th className="py-3 px-4">Distance (mi)</th>
              <th className="py-3 px-4">Moving Time (hr)</th>
              <th className="py-3 px-4">Elevation Gain (ft)</th>
            </tr>
          </thead>
          <tbody>
            {results.yearlySummary.map((row, index) => (
              <tr
                key={row.Year}
                className={`border-b border-[#dddddd] ${index % 2 === 1 ? 'bg-[#f3f3f3]' : ''}`}
              >
                <td className="py-3 px-4">{row.Year}</td>
                <td className="py-3 px-4">{row.Activities}</td>
                <td className="py-3 px-4">{row['Distance (mi)']}</td>
                <td className="py-3 px-4">{row['Moving Time (hr)']}</td>
                <td className="py-3 px-4">{row['Elevation Gain (ft)']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Distance Histogram */}
      <div className="flex justify-center mb-8" id="hist-dist">
        <Plot
          data={distanceHistData.data}
          layout={distanceHistData.layout}
          config={{ responsive: true }}
        />
      </div>

      {/* Pace Distribution */}
      <div className="flex justify-center mb-8" id="hist-pace">
        <Plot
          data={paceDistribData.data}
          layout={paceDistribData.layout}
          config={{ responsive: true }}
        />
      </div>

      {/* Monthly Distribution */}
      <div className="flex justify-center mb-8" id="bar-num-runs">
        <Plot
          data={monthDistribData.data}
          layout={monthDistribData.layout}
          config={{ responsive: true }}
        />
      </div>

      {/* Pie Chart */}
      <div className="flex justify-center mb-8" id="pie-dist">
        <Plot
          data={pieData.data}
          layout={pieData.layout}
          config={{ responsive: true }}
        />
      </div>
    </div>
  )
}

export default Results