function ComplaintForm({ type, data, onSubmit, onCancel }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{type === 'add' ? 'Gửi Khiếu Nại' : 'Sửa Khiếu Nại'}</h2>
                <form onSubmit={(e) => onSubmit(e, data?.id)}>
                    <label>
                        Tiêu đề:
                        <input
                            type="text"
                            name="title"
                            defaultValue={type === 'edit' ? data.title : ''}
                            required
                        />
                    </label>
                    <label>
                        Nội dung:
                        <textarea
                            name="content"
                            defaultValue={type === 'edit' ? data.content : ''}
                            required
                        ></textarea>
                    </label>
                    {type === 'edit' && (
                        <label>
                            Trạng thái:
                            <select name="status" defaultValue={data.status}>
                                <option value="Chưa xử lý">Chưa xử lý</option>
                                <option value="Đang xử lý">Đang xử lý</option>
                                <option value="Đã xử lý">Đã xử lý</option>
                            </select>
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

export default ComplaintForm;