import React from 'react';

const VendorPermissionCheckboxes = ({ permissions, setPermissions }) => {

    const handleChange = (e) => {
        const { id, checked } = e.target;
        setPermissions({ ...permissions, [id]: checked });
    };

    return (
        <div className="mb-3">
        <label className="form-label">Vendor Permissions:</label><br />
        {['add', 'update', 'delete'].map((perm) => (
            <div className="form-check" key={perm}>
            <input
                type="checkbox"
                className="form-check-input"
                id={perm}
                checked={permissions[perm] || false}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={perm}>{perm}</label>
            </div>
        ))}
        </div>
    );
};

export default VendorPermissionCheckboxes;