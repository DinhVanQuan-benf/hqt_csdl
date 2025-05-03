function ServiceForm({ type, data, onSubmit, onCancel }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{type === 'add' ? 'Thêm Dịch Vụ' : type === 'edit' ? 'Sửa Dịch Vụ' : 'Đặt Dịch Vụ'}</h2>
                <form onSubmit={(e) => onSubmit(e, data?.id)}>
                    <label>
                        Tên dịch vụ:
                        <input
                            type="text"
                            name="name"
                            defaultValue={type === 'edit' ? data.name : ''}
                            required
                        />
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
                            Thời gian sử dụng (ngày):
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

export default ServiceForm;