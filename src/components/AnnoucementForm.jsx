function AnnouncementForm({ type, data, onSubmit, onCancel }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{type === 'add' ? 'Thêm Thông Báo' : 'Sửa Thông Báo'}</h2>
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
                                <option value="Sắp tới">Sắp tới</option>
                                <option value="Đang diễn ra">Đang diễn ra</option>
                                <option value="Hoàn thành">Hoàn thành</option>
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

export default AnnouncementForm;