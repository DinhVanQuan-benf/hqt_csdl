export const mockHomeData = {
    buildingInfo: {
        name: "Tòa Nhà Sunrise",
        address: "123 Đường Láng Hạ, Quận Đống Đa, Hà Nội",
        description: "Tòa nhà hiện đại với các tiện ích cao cấp, phù hợp cho văn phòng và cư dân.",
        amenities: [
            "Bãi đỗ xe 24/7",
            "Hệ thống an ninh camera",
            "Thang máy tốc độ cao",
            "Khu vực sinh hoạt chung",
            "Wi-Fi miễn phí"
        ],
        contact: {
            phone: "0123 456 789",
            email: "contact@sunrisebuilding.vn",
            website: "www.sunrisebuilding.vn"
        }
    },
    announcements: [
        {
            id: 1,
            title: "Bảo trì thang máy",
            content: "Thang máy số 1 sẽ được bảo trì từ 9:00 đến 12:00 ngày 28/04/2025.",
            date: "2025-04-26",
            status: "Đang diễn ra"
        },
        {
            id: 2,
            title: "Cắt nước tạm thời",
            content: "Nước sẽ bị cắt từ 14:00 đến 16:00 ngày 29/04/2025 để sửa ống nước.",
            date: "2025-04-26",
            status: "Sắp tới"
        }
    ]
};

export const mockRoomsData = [
    {
        id: 1,
        number: "101",
        type: "Căn hộ",
        price: 10000000,
        status: "Trống"
    },
    {
        id: 2,
        number: "202",
        type: "Văn phòng",
        price: 15000000,
        status: "Đã thuê"
    }
];

export const mockServicesData = [
    {
        id: 1,
        name: "Dọn dẹp",
        price: 500000,
        status: "Có sẵn"
    },
    {
        id: 2,
        name: "Bảo vệ 24/7",
        price: 1000000,
        status: "Có sẵn"
    }
];

export const mockInvoicesData = [
    {
        id: 1,
        customer: "Nguyễn Văn A",
        amount: 12000000,
        issueDate: "2025-04-01",
        status: "Chưa thanh toán"
    },
    {
        id: 2,
        customer: "Trần Thị B",
        amount: 8000000,
        issueDate: "2025-04-15",
        status: "Đã thanh toán"
    }
];

export const mockReviewsData = [
    {
        id: 1,
        rating: 4,
        comment: "Tòa nhà sạch sẽ, dịch vụ tốt.",
        date: "2025-04-20"
    },
    {
        id: 2,
        rating: 3,
        comment: "Cần cải thiện tốc độ xử lý khiếu nại.",
        date: "2025-04-22"
    }
];

export const mockComplaintsData = [
    {
        id: 1,
        title: "Hỏng điều hòa",
        content: "Điều hòa phòng 101 không hoạt động từ 2 ngày trước.",
        date: "2025-04-25",
        status: "Chưa xử lý"
    },
    {
        id: 2,
        title: "Rò rỉ nước",
        content: "Ống nước tầng 3 bị rò rỉ.",
        date: "2025-04-26",
        status: "Đang xử lý"
    }
];

export const mockMessagesData = [
    {
        id: 1,
        content: "Xin chào, tôi cần hỗ trợ về hóa đơn.",
        time: "10:30",
        isOwnMessage: false
    },
    {
        id: 2,
        content: "Chào bạn, vui lòng cung cấp mã hóa đơn.",
        time: "10:32",
        isOwnMessage: true
    }
];

export const mockAccountData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "0987654321"
};

export const mockBookingsData = [
    {
        id: 1,
        room: "101",
        customer: "Nguyễn Văn A",
        duration: 12,
        date: "2025-04-20",
        status: "Chờ duyệt"
    },
    {
        id: 2,
        room: "202",
        customer: "Trần Thị B",
        duration: 6,
        date: "2025-04-22",
        status: "Đã duyệt"
    }
];

export const mockStatsData = {
    totalRooms: 50,
    availableRooms: 10,
    revenue: 500000000,
    pendingComplaints: 5
};