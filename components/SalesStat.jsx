// import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
// import { useState } from 'react';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

// const SalesStat = () => {
//     const [selectedYear, setSelectedYear] = useState('2023'); // Default selected year is 2023

//     const handleYearChange = (event) => {
//         setSelectedYear(event.target.value);
//     };

//     const data = {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//         datasets: [
//             {
//                 label: 'Sales',
//                 data: [65, 59, 80, 81, 56, 55, 40, 70, 75, 90, 65, 85],
//                 backgroundColor: [
//                     'rgba(75,192,192,0.2)',
//                     'rgba(255,99,132,0.2)',
//                     'rgba(54,162,235,0.2)',
//                     'rgba(255,206,86,0.2)',
//                     'rgba(75,192,192,0.2)',
//                     'rgba(153,102,255,0.2)',
//                     'rgba(255,159,64,0.2)',
//                     'rgba(75,192,192,0.2)',
//                     'rgba(255,99,132,0.2)',
//                     'rgba(54,162,235,0.2)',
//                     'rgba(255,206,86,0.2)',
//                     'rgba(153,102,255,0.2)',
//                 ],
//                 borderColor: [
//                     'rgba(75,192,192,1)',
//                     'rgba(255,99,132,1)',
//                     'rgba(54,162,235,1)',
//                     'rgba(255,206,86,1)',
//                     'rgba(75,192,192,1)',
//                     'rgba(153,102,255,1)',
//                     'rgba(255,159,64,1)',
//                     'rgba(75,192,192,1)',
//                     'rgba(255,99,132,1)',
//                     'rgba(54,162,235,1)',
//                     'rgba(255,206,86,1)',
//                     'rgba(153,102,255,1)',
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const options = {
//         scales: {
//             x: {
//                 type: 'category',
//             },
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };

//     return (
//         <div className='bg-gray-50 dark:bg-gray-100 p-5 rounded-lg shadow-md max-w-[600px] my-0 mx-auto'>
//             <div className="mb-3 flex justify-between">
//                 <div>
//                     <h2 className='font-[24px] mb-3 dark:text-black'>Sales Statistics</h2>
//                 </div>
//                 <div>
//                     <label htmlFor="yearSelect" className="block text-sm font-medium text-gray-700">
//                         Select Year:
//                     </label>
//                     <select
//                         id="yearSelect"
//                         name="year"
//                         onChange={handleYearChange}
//                         value={selectedYear}
//                         className="mt-1 block w-full py-2 px-3 border border-emerald-400 bg-white rounded-md shadow-sm focus:ring-1 focus:ring-emerald-400 focus:border-emerald-500 sm:text-sm dark:text-black cursor-pointer">
//                         <option value="2020">2020</option>
//                         <option value="2021">2021</option>
//                         <option value="2022">2022</option>
//                         <option value="2023">2023</option>
//                     </select>
//                 </div>

//             </div>

//             <div>
//                 <Bar data={data} options={options} />
//             </div>
//         </div>
//     );
// };

// export default SalesStat;



import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const SalesStat = () => {
    const [selectedYear, setSelectedYear] = useState('2023');
    const [salesData, setSalesData] = useState([]); // Initialize with an empty array

    useEffect(() => {
        // Fetch data based on selectedYear
        // Need to replace this with actual data fetching logic
        // For example, you can use fetch() or an API call library like Axios

        // For this example, I'll use dummy data for demonstration
        const dummyData = {
            '2020': [75, 95, 60, 85, 75, 60, 80, 85, 90, 75, 100, 110],
            '2021': [95, 85, 80, 100, 75, 80, 90, 50, 95, 80, 105, 110],
            '2022': [60, 65, 100, 85, 80, 85, 75, 95, 100, 60, 110, 115],
            '2023': [65, 59, 80, 81, 56, 55, 40, 70, 75, 110, 95, 120]
        };

        setSalesData(dummyData[selectedYear]);
    }, [selectedYear]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Sales',
                data: salesData,
                backgroundColor: [
                    'rgba(75,192,192,0.2)',
                    'rgba(255,99,132,0.2)',
                    'rgba(54,162,235,0.2)',
                    'rgba(255,206,86,0.2)',
                    'rgba(75,192,192,0.2)',
                    'rgba(153,102,255,0.2)',
                    'rgba(255,159,64,0.2)',
                    'rgba(75,192,192,0.2)',
                    'rgba(255,99,132,0.2)',
                    'rgba(54,162,235,0.2)',
                    'rgba(255,206,86,0.2)',
                    'rgba(153,102,255,0.2)',
                ],
                borderColor: [
                    'rgba(75,192,192,1)',
                    'rgba(255,99,132,1)',
                    'rgba(54,162,235,1)',
                    'rgba(255,206,86,1)',
                    'rgba(75,192,192,1)',
                    'rgba(153,102,255,1)',
                    'rgba(255,159,64,1)',
                    'rgba(75,192,192,1)',
                    'rgba(255,99,132,1)',
                    'rgba(54,162,235,1)',
                    'rgba(255,206,86,1)',
                    'rgba(153,102,255,1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='bg-gray-50 dark:bg-gray-100 p-5 rounded-lg shadow-md max-w-[600px] my-0 mx-auto'>
            <div className="mb-3 flex justify-between">
                <div>
                    <h2 className='font-[24px] mb-3 dark:text-black'>Sales Statistics</h2>
                </div>
                <div>
                    <label htmlFor="yearSelect" className="block text-sm font-medium text-gray-700">
                        Select Year:
                    </label>
                    <select
                        id="yearSelect"
                        name="year"
                        onChange={handleYearChange}
                        value={selectedYear}
                        className="mt-1 block w-full py-2 px-3 border border-emerald-400 bg-white rounded-md shadow-sm focus:ring-1 focus:ring-emerald-400 focus:border-emerald-500 sm:text-sm dark:text-black cursor-pointer"
                    >
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>

                </div>
            </div>

            <div>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default SalesStat;
