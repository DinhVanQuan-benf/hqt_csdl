import { useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import '../styles/stats.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function StatsPage({ role }) {
    const [stats] = useState({
        totalResidents: 120,
        totalRooms: 50,
        occupiedRooms: 40,
        revenue: 15000000,
    });

    const populationData = {
        labels: ['2025-04-26', '2025-04-27', '2025-04-28', '2025-04-29', '2025-04-30', '2025-05-01', '2025-05-02'],
        datasets: [
            {
                label: 'Số lượng dân cư',
                data: [115, 116, 118, 119, 120, 120, 120],
                borderColor: '#1abc9c',
                backgroundColor: 'rgba(26, 188, 156, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const occupancyData = {
        labels: ['Đã lấp đầy', 'Trống'],
        datasets: [
            {
                data: [stats.occupiedRooms, stats.totalRooms - stats.occupiedRooms],
                backgroundColor: ['#1abc9c', '#ddd'],
            },
        ],
    };

    const revenueData = {
        labels: ['2025-04-26', '2025-04-27', '2025-04-28', '2025-04-29', '2025-04-30', '2025-05-01', '2025-05-02'],
        datasets: [
            {
                label: 'Doanh thu (VND)',
                data: [2000000, 2200000, 2100000, 2300000, 2400000, 2200000, 2500000],
                backgroundColor: 'rgba(26, 188, 156, 0.8)',
                borderRadius: 8,
                barThickness: 40,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: false },
        },
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let value = context.raw.toLocaleString('vi-VN');
                        return ` ${value} VND`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value.toLocaleString('vi-VN');
                    },
                    color: '#555',
                },
                grid: {
                    color: '#eee',
                },
            },
            x: {
                ticks: {
                    color: '#555',
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="page stats-page">
            <h2>Thống Kê</h2>
            <div className="stats-container">
                <div className="stat-card">
                    <h3>Tổng số dân cư</h3>
                    <p>{stats.totalResidents}</p>
                </div>
                <div className="stat-card">
                    <h3>Tổng số phòng</h3>
                    <p>{stats.totalRooms}</p>
                </div>
                <div className="stat-card">
                    <h3>Phòng đã lấp đầy</h3>
                    <p>{stats.occupiedRooms}</p>
                </div>
                <div className="stat-card">
                    <h3>Doanh thu</h3>
                    <p>{stats.revenue.toLocaleString()} VND</p>
                </div>
            </div>

            <h2>Biểu Đồ Thống Kê</h2>
            <div className="charts-container">
                {/* Biểu đồ đường */}
                <div className="chart">
                    <h3>Số lượng dân cư (7 ngày gần nhất)</h3>
                    <Line data={populationData} options={chartOptions} />
                </div>

                {/* Biểu đồ tròn & cột */}
                <div className="charts-row">
                    <div className="chart">
                        <h3>Phần trăm căn hộ lấp đầy</h3>
                        <Pie data={occupancyData} options={chartOptions} />
                    </div>
                    <div className="chart">
                        <h3>Doanh thu (7 ngày gần nhất)</h3>
                        <Bar data={revenueData} options={barOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatsPage;
