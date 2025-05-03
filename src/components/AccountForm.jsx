function AccountForm({ data, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="account-form">
            <label>
                Tên:
                <input type="text" name="name" defaultValue={data.name} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" defaultValue={data.email} required />
            </label>
            <label>
                Số điện thoại:
                <input type="tel" name="phone" defaultValue={data.phone} required />
            </label>
            <label>
                Mật khẩu cũ:
                <input type="password" name="password" />
            </label>
            <label>
                Mật khẩu mới (để trống nếu không đổi):
                <input type="password" name="password" />
            </label>
            <button type="submit">Cập nhật</button>
        </form>
    );
}

export default AccountForm;