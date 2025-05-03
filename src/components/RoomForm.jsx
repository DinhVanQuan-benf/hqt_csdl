function RoomForm({ type, data, onSubmit, onCancel }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{type === 'add' ? 'Thêm Phòng' : type === 'edit' ? 'Sửa Phòng' : 'Đặt Phòng'}</h2>
                <form onSubmit={(e) => onSubmit(e, data?.id)}>
                    <label>
                        Số phòng:
                        <input
                            type="text"
                            name="number"
                            defaultValue={type === 'edit' ? data.number : ''}
                            required
                        />
                    </label>
                    <label>
                        Loại phòng:
                        <select name="type" defaultValue={type === 'edit' ? data.type : ''}>
                            <option value="Căn hộ">Căn hộ</option>
                            <option value="Văn phòng">Văn phòng</option>
                            <option value="Thương mại">Thương mại</option>
                        </select>
                    </label>
                    <label>
                        Giá (VND):
                        <input
                            type="number"
                            name="price"
                            defaultValue={type === 'edit' ? data.price : ''}
                            required
                        />
                    </label>
                    {type === 'book' && (
                        <label>
                            Thời gian thuê (tháng):
                            <input type="number" name="duration" required />
                        </label>
                    )}
                    <div className="modal-actions">
                        <button type="submit">Lưu</button>
                        <button type="button" onClick={onCancel}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RoomForm;