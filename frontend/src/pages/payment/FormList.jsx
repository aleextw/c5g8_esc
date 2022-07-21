const FormList = ({forms}) => {
    return (
        <div className="form-list">
            {forms.map(form => (
                <div className="form-preview" key={form.id}>
                    <h2>User Details</h2>
                    <p>Name: {form.name}</p>
                    <p>Email: {form.email}</p>
                    <p>Phone Number: {form.number}</p>
                    <p>Message: {form.message}</p>
                </div>
            ))}
        </div>
    )
}

export default FormList;