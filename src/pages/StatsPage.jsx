import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';
import '../styles/stats.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function StatsPage() {
    const [stats, setStats] = useState({
        totalResidents: 0,
        totalRooms: 0,
        occupiedRooms: 0,
        revenue: 0,
        monthlyRevenue: 0,
        servicesUsedThisMonth: 0,
        topServices: [],
        revenueByMonth: [],
    });

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const res = await axios.get('/api/resident/all');
                const residents = res.data;

                const totalResidents = residents.length;
                const rentalRoomIds = new Set(residents.flatMap(r => r.rentalTimes));
                const occupiedRooms = rentalRoomIds.size;
                const totalRooms = 25;

                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                let totalRevenue = 0;
                let monthlyRevenue = 0;
                let monthlyServicesCount = 0;
                const serviceCountMap = {};
                const revenueMonthMap = Array(12).fill(0);

                residents.forEach(r => {
                    r.usedServices.forEach(us => {
                        const serviceName = us.service.name;
                        serviceCountMap[serviceName] = (serviceCountMap[serviceName] || 0) + 1;
                        us.bills?.forEach(bill => {
                            const billDate = new Date(bill.paymentDate);
                            const amount = bill.paymentAmount || 0;
                            totalRevenue += amount;
                            revenueMonthMap[billDate.getMonth()] += amount;
                            if (billDate.getMonth() === currentMonth && billDate.getFullYear() === currentYear) {
                                monthlyRevenue += amount;
                                monthlyServicesCount++;
                            }
                        });
                    });
                });

                const sortedTopServices = Object.entries(serviceCountMap)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([name, count]) => ({ name, count }));

                setStats({
                    totalResidents,
                    totalRooms,
                    occupiedRooms,
                    revenue: totalRevenue,
                    monthlyRevenue,
                    servicesUsedThisMonth: monthlyServicesCount,
                    topServices: sortedTopServices,
                    revenueByMonth: revenueMonthMap,
                });
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu tổng quan:', err);
            }
        };

        fetchOverview();
    }, []);

    const occupancyData = {
        labels: ['Đã lấp đầy', 'Còn trống'],
        datasets: [
            {
                data: [stats.occupiedRooms, stats.totalRooms - stats.occupiedRooms],
                backgroundColor: ['#1abc9c', '#ecf0f1'],
            },
        ],
    };

    const topServicesData = {
        labels: stats.topServices.map(s => s.name),
        datasets: [
            {
                label: 'Số lần sử dụng',
                data: stats.topServices.map(s => s.count),
                backgroundColor: ['#3498db', '#9b59b6', '#e67e22'],
            },
        ],
    };

    const monthlyRevenueData = {
        labels: Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
        datasets: [
            {
                label: 'Doanh thu theo tháng',
                data: stats.revenueByMonth,
                backgroundColor: '#1abc9c',
                borderRadius: 6,
            },
        ],
    };

    return (
        <div className="page stats-page">
            <h2>Thống Kê Tổng Quan</h2>
            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div>
                        <h3>Số cư dân</h3>
                        <p>{stats.totalResidents}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🏢</div>
                    <div>
                        <h3>Tổng số phòng</h3>
                        <p>{stats.totalRooms}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div>
                        <h3>Phòng đã lấp đầy</h3>
                        <p>{stats.occupiedRooms}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div>
                        <h3>Doanh thu</h3>
                        <p>{stats.revenue.toLocaleString()} VND</p>
                    </div>
                </div>

                <div className="stat-card"><h3>Số dịch vụ sử dụng tháng này</h3><p>{stats.servicesUsedThisMonth}</p></div>
            </div>

            <div className="charts-container">
                <div className="chart">
                    <h3>Tỷ lệ sử dụng phòng</h3>
                    <Pie data={occupancyData} />
                </div>
                <div className="chart">
                    <h3>Top 3 dịch vụ được sử dụng nhiều nhất</h3>
                    <Bar data={topServicesData} />
                </div>
                <div className="chart">
                    <h3>Doanh thu trong năm</h3>
                    <Bar data={monthlyRevenueData} />
                </div>
            </div>
        </div>
    );
}

export default StatsPage;
