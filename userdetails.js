<div className="address-section">
  <h3 className="section-title">Address Details</h3>

  <div className="address-row">
    <div className="address-field">
      <label className="address-label">Address *</label>
      <textarea
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        className={address-textarea ${errors.address ? 'error' : ''}}
        placeholder="Enter your complete address"
      />
      {errors.address && <span className="address-error">{errors.address}</span>}
    </div>

    <div className="address-field">
      <label className="address-label">Pincode *</label>
      <input
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleInputChange}
        className={address-input ${errors.pincode ? 'error' : ''}}
        placeholder="400001"
        maxLength="6"
      />
      {errors.pincode && <span className="address-error">{errors.pincode}</span>}
    </div>
  </div>
</div>



/* Wrapper for the whole address section */
.address-section {
  margin-top: 24px;
}

/* Two-column layout on larger screens */
.address-row {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Address | Pincode */
  gap: 16px;
  align-items: start;
}

/* Stack on small screens */
@media (max-width: 768px) {
  .address-row {
    grid-template-columns: 1fr;
  }
}

/* Each field */
.address-field {
  display: flex;
  flex-direction: column;
}

/* Label + inputs */
.address-label {
  font-weight: 600;
  margin-bottom: 6px;
}

.address-input,
.address-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cfd4dc;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s ease;
}

.address-textarea {
  min-height: 96px;            /* ~3 rows */
  resize: vertical;
}

.address-input:focus,
.address-textarea:focus {
  border-color: #3b82f6;       /* blue focus */
}

/* Error state */
.address-input.error,
.address-textarea.error {
  border-color: #e11d48;
}

.address-error {
  color: #e11d48;
  font-size: 12px;
  margin-top: 6px;
}